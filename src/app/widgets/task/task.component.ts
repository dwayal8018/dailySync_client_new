import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/taskModel';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasksList: TaskModel[] = [];
  // task:TaskModel=new TaskModel();
  constructor(private taskService: TaskService) { }
  displayedColumns: string[] = ['checkbox', 'title', 'dueDate', 'status'];

  stages: string[] = ['To Do', 'In Progress', 'Completed']; // Define the stages

  todoList: TaskModel[] = [];
  inProgressList: TaskModel[] = [];
  completedList: TaskModel[] = [];

  ngOnInit(): void {
    this.loadTasksList();
  }

  loadTasksList() {
    this.taskService.getTasks().subscribe(res => {
      this.tasksList = res;
      for (let task of this.tasksList) {
        if (task.status == "To Do") {
          this.todoList.push(task);
        } else if (task.status == "In Progress") {
          this.inProgressList.push(task);
        } else if (task.status == "Completed") {
          this.completedList.push(task);
          task.completed = true;
        }
      }
    })
  }
  onCheckboxChange(task: any) {
    task.completed = !task.completed; // Toggle the completed state
  }


  filterTasksByStage(stage: string): TaskModel[] {
    return this.tasksList.filter(task => task.status === stage);
  }


drop(event: CdkDragDrop<TaskModel[]>) {
  const previousTask = event.previousContainer.data[event.previousIndex];

  // If moving within the same container
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // Moving to a different container
    const newStatus = event.container.id; // This should be the stage name
    previousTask.status = newStatus; // Update task status

    // Update the tasks list
    this.tasksList = this.tasksList.map(task =>
      task.id === previousTask.id ? previousTask : task
    );

    // Transfer the item from the previous to the current container
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       this.tasksList,
  //       this.tasksList,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     // Update the status of the task after moving
  //     this.tasksList[event.currentIndex].status = event.container.id;
  //   }
  // }

  //   drop(event: CdkDragDrop<any[]>) {
  //     debugger;
  //     const movedTask = { ...event.previousContainer.data[event.previousIndex] }; // Clone the task

  //     // Update the task status based on the current container's ID
  //     movedTask.status = event.container.id;

  //     // Remove the task from the previous container's data
  //     const previousContainerData = event.previousContainer.data;
  //     previousContainerData.splice(event.previousIndex, 1); // Remove from original array

  //     // Add the task to the tasksList
  //     this.tasksList.push(movedTask); // Add to the main tasks list

  //     // Optional: You might want to update the state if you're using a reactive approach
  // }

}
