<template>
  <div class="container">
    <div class="row">
      <div class="col-6 align-self-center auto-margin">
        <form @submit.prevent class="task-form">
          <div class="form-row">
            <div class="col-7">
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder="Add your task"
                v-model="taskObject.taskDescription"
                autocomplete="off"
              />
            </div>
            <div class="col">
              <button
                class="btn btn-outline-primary"
                :disabled="!taskObject.taskDescription ||disableButton"
                @click="addTask"
              >Add task</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-6 align-self-center auto-margin tasks-container">
        <div
          class="task-head top-margin text-left"
        >Hi {{userDetails.name}}, here is your list of tasks</div>
        <div class="tasks-list">
          <div class="card">
            <div v-if="showLoadingMessage">Loading tasks...</div>
            <ul class="list-group list-group-flush" v-if="!showLoadingMessage && tasksList.length">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="task in tasksList"
                :key="task._id"
              >
                <span class="task-desc">{{task.description}}</span>
                <span class="edit-task-desc" hidden>
                  <input type="text" />
                </span>
                <span class="button-container">
                  <button class="btn btn-outline-secondary">Edit</button>
                  <button class="btn btn-outline-danger button-margin-left">Delete</button>
                  <button class="btn btn-outline-success button-margin-left">Complete</button>
                </span>
              </li>
            </ul>
            <div v-if="!showLoadingMessage && !tasksList.length">
              <div class="no-task-message">There are no tasks to show. Add a new task above</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import taskAppService from "@/services/services.js";
export default {
  name: "tasks",
  data() {
    return {
      taskObject: {},
      userDetails: JSON.parse(localStorage.getItem("user")),
      tasksList: [],
      token: taskAppService.getToken(),
      showLoadingMessage: true,
      disableButton: false
    };
  },
  methods: {
    async addTask() {
      this.disableButton = true;
      const options = {};
      options.url = "/tasks";
      options.data = { description: this.taskObject.taskDescription };
      try {
        await taskAppService.authPostCall(options);
        await this.getTasks();
        //Resettin form inout field
        this.taskObject = {};
        this.disableButton = false;
      } catch (error) {
        this.disableButton = false;
      }
    },
    async getTasks() {
      const options = {};
      options.url = "/tasks?limit=10&sortBy=createdAt:desc";
      try {
        const tasksResponse = await taskAppService.authGetCall(options);
        this.tasksList = tasksResponse.data;
        this.showLoadingMessage = false;
      } catch (error) {
        this.showLoadingMessage = false;
      }
    }
  },
  async created() {
    await this.getTasks();
  }
};
</script>
<style scoped>
.container .auto-margin {
  margin: 0 auto;
}
.container .task-form {
  margin-top: 1rem;
}
.container .tasks-container{
  margin-bottom: 1rem;
}
.tasks-container .task-head {
  margin-top: 1rem;
  font-size: 1.5rem;
}
.tasks-container .tasks-list {
  margin-top: 1rem;
}
.tasks-list .button-container .button-margin-left {
  margin-left: 0.175rem;
}
.tasks-list .button-container button {
  font-size: 0.875rem;
}
</style>