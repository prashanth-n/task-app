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
                v-for="(task,index) in tasksList"
                :key="index"
              >
                <span class="task-desc" v-if="toEditTaskIndex !== index">{{task.description}}</span>
                <span class="edit-task-desc" v-if="toEditTaskIndex === index">
                  <input type="text" v-model="task.description" />
                </span>
                <span class="button-container" v-if="toEditTaskIndex !== index">
                  <button class="btn btn-outline-secondary" @click="toEditTaskIndex = index">Edit</button>
                  <button
                    class="btn btn-outline-danger button-margin-left"
                    @click="openModal(task)"
                  >Delete</button>
                  <button
                    class="btn btn-outline-success button-margin-left"
                    @click="completeTask(task)"
                  >Complete</button>
                </span>
                <span class="button-container" v-if="toEditTaskIndex === index">
                  <button class="btn btn-outline-success" @click="saveTask(task)">Save</button>
                  <button class="btn btn-outline-secondary button-margin-left">Cancel</button>
                </span>
              </li>
            </ul>
            <div v-if="!showLoadingMessage && !tasksList.length">
              <div class="no-task-message">There are no tasks to show. Add a new task above</div>
            </div>
          </div>
        </div>
      </div>
      <b-modal
        ref="delete-modal"
        no-close-on-esc
        no-close-on-backdrop
        ok-title="Delete"
        cancel-title="Cancel"
        @ok="confirmDelete(selectedTask)"
      >
        <div class="d-block text-center">
          <h3>Delete {{selectedTask.description}}?</h3>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import taskAppService from "@/services/services.js";
import { BModal } from "bootstrap-vue";
export default {
  name: "tasks",
  components: {
    "b-modal": BModal
  },
  data() {
    return {
      taskObject: {},
      userDetails: JSON.parse(localStorage.getItem("user")),
      tasksList: [],
      token: taskAppService.getToken(),
      showLoadingMessage: true,
      disableButton: false,
      editMode: false,
      toEditTaskIndex: null,
      selectedTask: ''
    };
  },
  methods: {
    async confirmDelete({_id}){
      const options = {}
      options.url = `/tasks/${_id}`
      await taskAppService.authDeleteCall(options)
      await this.getTasks('false')
      this.$refs["delete-modal"].close();
    },
    openModal(task) {
      this.selectedTask = task;
      this.$refs["delete-modal"].show();
    },
    async completeTask({ _id }) {
      this.disableButton = true;
      const options = {};
      options.url = `/tasks/${_id}`;
      options.data = {
        completed: true
      };
      try {
        await taskAppService.authPatchCall(options);
        this.disableButton = false;
        await this.getTasks("false");
      } catch (error) {
        this.disableButton = false;
      }
    },
    editTask(index) {
      this.toEditTaskIndex = index;
    },
    async saveTask({ _id, description, completed }) {
      this.disableButton = true;
      const options = {};
      options.url = `/tasks/${_id}`;
      options.data = {
        description,
        completed
      };
      try {
        await taskAppService.authPatchCall(options);
        this.toEditTaskIndex = null;
        this.disableButton = false;
        await this.getTasks("false");
      } catch (err) {
        this.disableButton = false;
      }
    },
    async addTask() {
      this.disableButton = true;
      const options = {};
      options.url = "/tasks";
      options.data = { description: this.taskObject.taskDescription };
      try {
        await taskAppService.authPostCall(options);
        await this.getTasks("false");
        //Resettin form inout field
        this.taskObject = {};
        this.disableButton = false;
      } catch (error) {
        this.disableButton = false;
      }
    },
    async getTasks(completedFlag) {
      const options = {};
      options.url = `/tasks?limit=10&sortBy=createdAt:desc&completed=${completedFlag}`;
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
    await this.getTasks("false");
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
.container .tasks-container {
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