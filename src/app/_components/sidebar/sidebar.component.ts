import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {    
    this.onClick('load');
    console.log(window.location.href);
    setTimeout(function() {
      console.log($('#sidebar-menu a').href);
    }, 5000);
    
    
    $("#sidebar-menu a").each(function(ele) {
      // console.log(this.href);
      if (ele.href == window.location.href) {
          $(this).addClass("active");
          $(this).parent().addClass("active"); // add active to li of the current link
          $(this).parent().parent().addClass("in");
          $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
          $(this).parent().parent().parent().addClass("active");
          $(this).parent().parent().parent().parent().addClass("in"); // add active to li of the current link
          $(this).parent().parent().parent().parent().parent().addClass("active");
      }
    });
  }


  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.href;
    var value = idAttr.nodeValue;
    alert(target);
  }
  

}
