<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="mx-auto d-flex align-center justify-center">
      <v-chip-group
        selected-class="primary"
        color="primary"
        mandatory
        filter
        v-model="selectedExtension"
      >
        <v-chip value="all"> &nbsp;Tudo&nbsp; </v-chip>
        <v-chip value="image"> &nbsp;Imagens&nbsp; </v-chip>
        <v-chip value="video"> &nbsp;Vídeos&nbsp; </v-chip>
      </v-chip-group>
    </v-col>
    <v-row>
      <v-col cols="12" class="mt-2">
        <p v-if="filteredPosts.length === 0" class="text-center text-caption text-medium-emphasis">
          Nenhum publicação encontrada
        </p>
      </v-col>
    </v-row>

    <v-card
      v-for="post in filteredPosts"
      class="rounded-xl elevation-4 mt-4"
      width="600"
      color="postBackground"
    >
      <v-card-title class="d-flex align-center">
        <v-avatar size="50">
          <v-img cover :src="post?.userData?.profilePicture"></v-img>
        </v-avatar>

        <div class="ml-2">
          <span class="text-h6">{{ post?.userData?.name }}</span>
          <v-spacer class="mb-n4"></v-spacer>
          <span class="text-caption text-medium-emphasis">@{{ post?.userData?.user }}</span>
        </div>

        <v-spacer></v-spacer>

        <p class="text-caption text-medium-emphasis mr-n1">{{ formatDate(post.createdAt) }}</p>
        <v-btn
          v-if="post?.userId === idStore.id"
          variant="text"
          class="ma-4 mr-n4"
          @click="deleteDialog = true"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-dialog v-model="deleteDialog" width="600" persistent>
          <v-card
            class="rounded-xl elevation-4"
            flat
            color="background"
            title="Confirmação"
            subtitle="Você deseja deletar sua postagem?"
          >
            <template v-slot:prepend>
              <v-icon color="primary">mdi-delete</v-icon>
            </template>
            <v-card-actions>
              <v-btn color="primary" @click="deletePost(post.id)">SIM</v-btn>
              <v-btn @click="deleteDialog = false">NÃO</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text class="text-justify mt-5">
        <div>
          <p>{{ post?.description }}</p>
          <v-spacer></v-spacer>
          <v-divider class="mt-2"></v-divider>
          <template v-if="post?.mention && post?.mention.length > 0">
            <NuxtLink
              v-for="(mention, index) in post?.mention.split(',')"
              :key="index"
              :to="`/@${mention.trim()}`"
            >
              <v-chip color="primary" class="mr-2 mt-2"> @{{ mention.trim() }} </v-chip>
            </NuxtLink>
          </template>
        </div>
      </v-card-text>
      <v-card width="100%" class="cursor-pointer mb-n10" v-if="post?.content !== null">
        <template v-if="isImage(post.content)">
          <v-img :src="post?.content"></v-img>
        </template>
        <template v-else-if="isVideo(post.content)">
          <video width="100%" controls>
            <source :src="post?.content" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </template>
      </v-card>
      <v-card-actions class="mt-2 mb-n9 ml-n6">
        <v-container>
          <v-btn color="primary" icon class="ma-4" @click="toggleLike(post)">
            <v-icon>{{
              isCurrentUserLiked(post.likes) ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon>
            &nbsp;{{ post?.likes?.length }}
          </v-btn>
          <v-btn color="primary" icon class="ma-4">
            <v-icon>mdi-comment-outline</v-icon>
            &nbsp;{{ post?.comments?.length }}
          </v-btn>
          <v-btn color="primary" icon clas="ma-4">
            <v-icon @click="sharePublication(post.id)">mdi-share-variant</v-icon>
          </v-btn>
        </v-container>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card
        class="overflow-auto elevation-0 mb-4"
        v-if="post?.comments?.length !== 0"
        flat
        color="postBackground"
        height="150"
      >
        <v-card-text class="commentList mb-n6" v-for="comment in post?.comments">
          <div class="d-flex align-center">
            <p>
              <b>&nbsp;&nbsp;{{ comment?.commenter?.name }}:</b>
              {{ comment?.content }}
            </p>
            <v-icon
              @click="deleteDialogComment = true"
              class="ml-auto"
              v-if="comment?.length !== 0 && idStore.id == comment?.commenter?.id"
              size="16"
              >mdi-delete</v-icon
            >
          </div>
          <v-dialog v-model="deleteDialogComment" width="600" persistent>
            <v-card
              class="rounded-xl elevation-4"
              flat
              color="background"
              title="Confirmação"
              subtitle="Você deseja deletar este comentário?"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-delete</v-icon>
              </template>
              <v-card-actions>
                <v-btn color="primary" @click="deleteComment(comment.id)">SIM</v-btn>
                <v-btn @click="deleteDialogComment = false">NÃO</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-text>
      </v-card>
      <v-card-text>
        <v-text-field
          placeholder="Faça um comentário"
          bg-color="input_color"
          lazy-validation
          v-model="comment.content"
          color="primary"
        >
          <template v-slot:append-inner>
            <v-icon @click="newComment(post.id)">mdi-send</v-icon>
          </template>
        </v-text-field>
      </v-card-text>
    </v-card>
  </v-row>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    rounded="pill"
    :timeout="snackbar.timeout"
    top
  >
    {{ snackbar.message }}
  </v-snackbar>
  <v-toolbar color="rgb(0,0,0,0)" height="100"></v-toolbar>
</template>
<script setup>
import { useIdStore } from "~/store/id";
import { useIdStorePublic } from "~/store/public";
import { ref, computed } from "vue";

const deleteDialogComment = ref(false);
const idStore = useIdStore();
const IdPublic = useIdStorePublic()
const snackbar = ref({
  show: false,
  message: "",
  color: "success",
  timeout: 4000,
});

const showSnackbar = (message, color) => {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout: 6000,
  };
};

const formatDate = (date) => {
  const now = new Date();
  const postDate = new Date(date);

  const diffInDays = Math.floor((now - postDate) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Hoje";
  } else if (diffInDays === 1) {
    return "Ontem";
  } else {
    return `há ${diffInDays} dias`;
  }
};

const comment = ref({
  content: null,
});

const idCreatorPublic = idStore.id;
const cookie = useCookie("token");
const deleteDialog = ref(false);
const token = cookie.value;
const posts = ref([]);
const isImage = (url) => /\.(jpeg|jpg|gif|png)$/.test(url.toLowerCase());
const isVideo = (url) => /\.(mp4|webm|ogg)$/.test(url.toLowerCase());
const selectedExtension = ref("all");
const totalPosts = ref(0);
const imagePosts = ref(0);
const videoPosts = ref(0);

// Share
const sharePublication = (id) => {
  navigator.clipboard.writeText(`https://seduvibe.com.br/post/${id}`);
  showSnackbar("Publicação copiada com sucesso!", "success");
};

// Toggle
const toggleLike = async (post) => {
  const hasLiked = isCurrentUserLiked(post.likes);

  try {
    if (hasLiked) {
      await deleteLike(post.id);
    } else {
      await newLike(post.id);
    }

    fetchPosts(idCreatorPublic);
  } catch (error) {
    console.error("Erro ao alternar curtida:", error);
  }
};

// Filter Post
const filteredPosts = computed(() => {
  if (selectedExtension.value === "all") {
    return posts.value;
  } else {
    const extensionFilter = selectedExtension.value === "image" ? ".jpg" : ".mp4";
    return posts.value.filter((post) => post?.content?.endsWith(extensionFilter));
  }
});

// Mention Transform
const hasMentions = (mention) => mention && mention.trim() !== "";

// Create
const newComment = async (id) => {
  const comment_payload = ref({
    postId: id,
    content: comment.value.content,
  });
  try {
    console.log(comment_payload);
    const { data, error } = await useFetch(`https://api.seduvibe.com.br/posts/create_comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: comment_payload,
    });
    comment.value.content = null;
    showSnackbar("Comentário feito com sucesso!", "success");
    fetchPosts(idCreatorPublic);
    console.log(data);
    console.log(error);
  } catch {
    //
  }
};

const newLike = async (id) => {
  try {
    const { data, error } = await useFetch(`https://api.seduvibe.com.br/posts/like/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showSnackbar("Vocẽ curtiu uma postagem!", "success");
    fetchPosts(idCreatorPublic);
    console.log(data);
    console.log(error);
  } catch {
    //
  }
};

// Delete
const deleteLike = async (id) => {
  try {
    const { data, error } = await useFetch(`https://api.seduvibe.com.br/posts/unlike/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts(idCreatorPublic);
    console.log(data);
  } catch {
    //
  }
};
const deletePost = async (id) => {
  try {
    const { data, error } = await useFetch(`https://api.seduvibe.com.br/posts/delete_post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    deleteDialog.value = false;
    showSnackbar("Postagem deletada com sucesso!", "success");
    fetchPosts(idCreatorPublic);
    console.log(data);
  } catch {
    //
  }
};
const deleteComment = async (id) => {
  try {
    const { data, error } = await useFetch(`https://api.seduvibe.com.br/posts/delete_comment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    deleteDialogComment.value = false;
    showSnackbar("Comentário deletado com sucesso!", "success");
    fetchPosts(idCreatorPublic);
    console.log(data);
  } catch {
    //
  }
};

//Fetch Post
const fetchPosts = async (id) => {
  const { data: postData } = await useFetch(`https://api.seduvibe.com.br/posts/list_all/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  posts.value = postData?._rawValue?.reverse() || [];
  totalPosts.value = posts?.value?.length;
  imagePosts.value = posts.value.filter((post) => post?.content?.endsWith(".jpg")).length || [];
  videoPosts.value = posts.value.filter((post) => post?.content?.endsWith(".mp4")).length || [];
};

// Fetch like
const isCurrentUserLiked = (likes) => {
  return likes.some((like) => like.userId === idStore.id);
};

fetchPosts(IdPublic.id);
</script>
