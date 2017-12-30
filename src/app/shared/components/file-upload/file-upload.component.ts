import { Observable } from 'rxjs/Observable';
import { Component, OnInit, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import 'rxjs/add/observable/of';

@Component({
  selector: 'dnh-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, AfterViewInit {
  @Output() fileRead: EventEmitter<any> = new EventEmitter<any>();
  @Output() disabledOverlayClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() greeting: string;
  private fileContent: Map<string, string>;
  private fileReader: FileReader;
  public disabled = true;
  @ViewChild('fileUploadComponent') fileUploadComponent: ElementRef;
  
  constructor() { }
  
  ngOnInit() {
    this.fileContent = new Map<string, string>();
    this.fileReader = new FileReader();
    this.fileReader.onloadend = e => this.readFile();
  }
  
  ngAfterViewInit(): void {
    console.log(this.fileUploadComponent);
  }
  public openFile(event) {
    console.log('Input file change');
    const file: File = event.target.files[0];
    this.fileReader.readAsText(file);
  }

  private readFile(): void {
    /** Clear previous read content */
    this.clearReadContent();
    /** result is content of file as text read by fileReader */
    const lineRegex = /^.*$/gm;
    const commentRegex = /^\#.*$/;
    let m;
    while (m = lineRegex.exec(this.fileReader.result)) {
      const line: string = m[0];
      if(commentRegex.test(line))
      {
        continue;
      }
      const fragments = line.split('=');
      this.fileContent.set(fragments[0], fragments[1]);
    }
    this.fileRead.emit(this.fileContent);
  }

  private clearReadContent(): void {
    this.fileContent.clear();
  }

  public draggingFieldClicked(): void {
    this.fileUploadComponent.nativeElement.click();
  }

  public drop(event: DragEvent): void {
    console.log('Drop event', event);
    event.preventDefault();
    const dt = event.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i=0; i < dt.items.length; i++) {
        if (dt.items[i].kind == "file") {
          const f = dt.items[i].getAsFile();
          this.fileReader.readAsText(this.validateFile(f));
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i=0; i < dt.files.length; i++) {
        this.fileReader.readAsText(this.validateFile(dt.files[i]));
      }
    }
  }

  private validateFile(file: File): File {
    // TODO Validate file extension & etc... and dispatch action on error
    return file;
  }

  // Required to disable default browser file drag/drop behavior
  public dragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public disabledOverlayClick(): void {
    // Somehow, the component is disabled
    // Clicking into overlay layer will trigger this event
    // which open a path for user to enable the component again.
    console.log('DIsabled Overlay Clicked');
    this.disabledOverlayClicked.emit();
  }
}
