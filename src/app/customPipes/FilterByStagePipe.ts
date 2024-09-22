import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByStage' })
export class FilterByStagePipe implements PipeTransform {
    transform(tasks: any[], stage: string): any[] {
        return tasks ? tasks.filter(task => task.status === stage) : [];
    }
}
