import { Component, OnInit } from '@angular/core'
import { slideRight, slideDownChunk } from '../components/shared/animations'
import { TestService } from './test.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [slideRight(), slideDownChunk()],
})
export class TestComponent implements OnInit {
  constructor(private testService: TestService) {}

  ngOnInit() {}
}
