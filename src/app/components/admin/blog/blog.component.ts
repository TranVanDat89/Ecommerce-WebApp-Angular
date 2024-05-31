import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogPostText: string = "";
  constructor() {
    this.blogPostText = "<h1>Hello World</h1>";
  }
  ngOnInit(): void {
    console.log(this.blogPostText);
  }
  getEditorContent() {
    console.log(this.blogPostText);
  }
}
