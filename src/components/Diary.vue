<template>
  <div class="bg-red-500">
    <div class="flex flex-col justify-center items-center h-40vh w-max mx-auto">
      <h1 class="self-start text-white my-4 text-2xl p-1">Diary.</h1>
      <form action="/" @keydown.enter="sendData">
        <textarea
          name="Diary"
          id="Diary"
          spellcheck="false"
          class="resize-none bg-gray-200 rounded-md shadow-lg focus:outline-none p-1 text-black w-72 minimobile:w-96 h-24"
          v-model="DiaryParagraph"
        ></textarea>
      </form>
    </div>
    <transition-group name="showUp" tag="div" v-cloak>
      <div
        v-for="diary in diaryData"
        :key="diary.id"
        class="py-3 flex flex-col items-start w-102 mx-auto max-w-90% sm:max-w-full"
      >
        <h1 class="ml-8 sm:ml-3">DAY: {{ diary.id }}</h1>
        <div class="w-102 bg-gray-200 p-4 mx-auto rounded-xl max-w-90% sm:max-w-full">
          <p class="p-1">
            {{ diary.diaryParag }}
          </p>
          <small class="text-red-600 text-sm pl-1 mt-1 inline-block"
            >~ {{ diary.author }}
            <span class="text-red-500">
              {{ diary.time }}
            </span>
          </small>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { db } from "./firebase";
export default {
  name: "Diary",
  data() {
    return {
      DiaryParagraph: "",
      diaryData: []
    };
  },
  methods: {
    sendData: function () {
      if (!this.DiaryParagraph) return;
      var diaryData;
      const diaryDatas = this.diaryData;
      let maxDiaryId = diaryDatas.length ? Math.max(...diaryDatas.map((note) => note.id)) : 0;
      diaryData = {
        id: maxDiaryId + 1,
        diaryParag: this.DiaryParagraph,
        author: "Adrian B.",
        time: this.actualDate()
      };
      db.collection("Diary").add(diaryData);
      diaryDatas.unshift(diaryData);
      this.DiaryParagraph = "";
    },
    actualDate() {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let today = days[new Date().getDay()];
      const day = new Date().toString().substr(0, 25);
      const currentDay = today + day.substring(3, day.length);
      return currentDay;
    }
  },
  async created() {
    await db
      .collection("Diary")
      .orderBy("id", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.data().id,
            diaryParag: doc.data().diaryParag,
            author: doc.data().author,
            time: doc.data().time
          };
          this.diaryData.push(data);
        });
      });
  }
};
</script>

<style lang="css" scoped>
[v-cloak] {
  display: none;
}
/* TRANSITIONs */
.showUp-enter-active,
.showUp-leave-active {
  transition: all 0.2s;
}

.showUp-enter-from,
.showUp-leave-to {
  opacity: 0;
  transform: scale(0.75);
}
</style>
