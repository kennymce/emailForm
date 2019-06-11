import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {nativeParentNode} from '@angular/core/src/render3/node_manipulation';

@Component({
  selector: 'app-ebury-attachment-list',
  templateUrl: './ebury-attachment-list.component.html',
  styleUrls: ['./ebury-attachment-list.component.less']
})
export class EburyAttachmentListComponent implements OnInit {
  @Output() binClick = new EventEmitter();
  public attachmentFile: any;
  public attachedImages: any;

  constructor(private elem: ElementRef) {
  }

  ngOnInit() {
  }

  removeImage(imageId) {
    const index = this.attachedImages.map( (image) => {
      return image.id;
    }).indexOf(imageId);
    this.attachedImages.splice(index, 1);
    this.binClick.emit();
  }
}
