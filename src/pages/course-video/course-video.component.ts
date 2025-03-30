/* START OF ORIGINAL FILE course-video.component.ts (No changes needed) */

import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-video.component.html',
  styleUrls: ['./course-video.component.css']
})
export class CourseVideoComponent implements OnInit, AfterViewInit {
  @ViewChild('courseVideo', { static: false }) courseVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayerContainer', { static: false }) videoPlayerContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('playPauseBtn', { static: false }) playPauseBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('seekBarContainer', { static: false }) seekBarContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('seekBarProgress', { static: false }) seekBarProgress!: ElementRef<HTMLDivElement>;
  @ViewChild('seekHandle', { static: false }) seekHandle!: ElementRef<HTMLDivElement>;
  @ViewChild('timeDisplay', { static: false }) timeDisplay!: ElementRef<HTMLSpanElement>;
  @ViewChild('fullscreenBtn', { static: false }) fullscreenBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('videoBreadcrumb', { static: false }) videoBreadcrumb!: ElementRef<HTMLParagraphElement>;
  @ViewChild('courseOutline', { static: false }) courseOutline!: ElementRef<HTMLElement>;
  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef<HTMLElement>;

  @ViewChildren('outlineItem') outlineItems!: QueryList<ElementRef<HTMLDivElement>>;

  private currentActiveItemIndex = 0;
  private allItems!: ElementRef<HTMLDivElement>[];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
        if (!this.courseVideo || !this.playPauseBtn || !this.seekBarContainer || !this.courseOutline || !this.outlineItems) {
            console.error("Required elements not found after view init.");
            return;
        }

        this.allItems = this.outlineItems.toArray();
        this.findInitialActiveIndex();

        if (this.courseVideo.nativeElement) {
            this.updatePlayPauseButton();
            if (this.courseVideo.nativeElement.readyState >= 1) {
                this.updateProgress();
            } else {
                this.courseVideo.nativeElement.addEventListener('loadedmetadata', this.updateProgress.bind(this), { once: true });
            }
        }

        this.addEventListeners();
    }, 0);
  }


  private addEventListeners(): void {
    if (this.playPauseBtn?.nativeElement) {
        this.playPauseBtn.nativeElement.addEventListener('click', this.togglePlayPause.bind(this));
    }
    if (this.courseVideo?.nativeElement) {
        this.courseVideo.nativeElement.addEventListener('play', this.updatePlayPauseButton.bind(this));
        this.courseVideo.nativeElement.addEventListener('pause', this.updatePlayPauseButton.bind(this));
        this.courseVideo.nativeElement.addEventListener('ended', this.handleVideoEnd.bind(this));
        this.courseVideo.nativeElement.addEventListener('timeupdate', this.updateProgress.bind(this));
    }
     if (this.seekBarContainer?.nativeElement) {
        this.seekBarContainer.nativeElement.addEventListener('click', this.handleSeek.bind(this));
     }
     if (this.fullscreenBtn?.nativeElement) {
        this.fullscreenBtn.nativeElement.addEventListener('click', this.toggleFullscreen.bind(this));
     }

    this.allItems.forEach((item, index) => {
        if (item?.nativeElement) {
          item.nativeElement.addEventListener('click', () => this.setActiveItem(index));
        }
    });

    if (this.courseOutline?.nativeElement) {
        this.courseOutline.nativeElement.addEventListener('click', (event) => {
            const header = (event.target as HTMLElement).closest('.section-header, .subsection-header');
            if (!header) return;

            const content = header.nextElementSibling as HTMLElement;
            const indicator = header.querySelector('.collapse-indicator');

            if (content && indicator && (content.classList.contains('section-content') || content.classList.contains('subsection-content'))) {
                const isCollapsed = content.classList.toggle('collapsed');
                indicator.classList.toggle('collapsed', isCollapsed);
                const iconSpan = indicator.querySelector('.icon');
                if (iconSpan) {
                   iconSpan.innerHTML = isCollapsed ? '▶' : '▼';
                }
            }
       });
    }
  }

  private togglePlayPause(): void {
    if (!this.courseVideo?.nativeElement) return;
    if (this.courseVideo.nativeElement.paused || this.courseVideo.nativeElement.ended) {
      this.courseVideo.nativeElement.play();
    } else {
      this.courseVideo.nativeElement.pause();
    }
  }

  private updatePlayPauseButton(): void {
    if (!this.playPauseBtn?.nativeElement || !this.courseVideo?.nativeElement) return;
    const isPaused = this.courseVideo.nativeElement.paused || this.courseVideo.nativeElement.ended;
    this.playPauseBtn.nativeElement.innerHTML = `<span class="icon">${isPaused ? '▶' : '❚❚'}</span>`;

    if (isPaused && this.videoPlayerContainer?.nativeElement) {
        this.videoPlayerContainer.nativeElement.classList.add('controls-visible');
    }
  }

  private handleVideoEnd(): void {
      this.updatePlayPauseButton();
      console.log("Video ended");
  }


  private updateProgress(): void {
    if (!this.courseVideo?.nativeElement || !this.seekBarProgress?.nativeElement || !this.seekHandle?.nativeElement || !this.timeDisplay?.nativeElement || isNaN(this.courseVideo.nativeElement.duration)) return;

    const video = this.courseVideo.nativeElement;
    const percentage = (video.currentTime / video.duration) * 100;
    this.seekBarProgress.nativeElement.style.width = `${percentage}%`;
    this.seekHandle.nativeElement.style.left = `${percentage}%`;
    this.timeDisplay.nativeElement.textContent = this.formatRemainingTime(
      video.currentTime,
      video.duration
    );
  }

  private handleSeek(event: MouseEvent): void {
    if (!this.seekBarContainer?.nativeElement || !this.courseVideo?.nativeElement || isNaN(this.courseVideo.nativeElement.duration)) return;

    const containerRect = this.seekBarContainer.nativeElement.getBoundingClientRect();
    const clickX = event.clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(1, clickX / containerRect.width));
    this.courseVideo.nativeElement.currentTime = percentage * this.courseVideo.nativeElement.duration;
  }

  private toggleFullscreen(): void {
      if (!this.videoPlayerContainer?.nativeElement || !this.fullscreenBtn?.nativeElement) return;

      const isInFullScreen = document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement;

      if (!isInFullScreen) {
          const requestFullscreen =
              this.videoPlayerContainer.nativeElement.requestFullscreen ||
              (this.videoPlayerContainer.nativeElement as any).mozRequestFullScreen ||
              (this.videoPlayerContainer.nativeElement as any).webkitRequestFullscreen ||
              (this.videoPlayerContainer.nativeElement as any).msRequestFullscreen;
          if (requestFullscreen) {
              requestFullscreen.call(this.videoPlayerContainer.nativeElement);
              this.fullscreenBtn.nativeElement.innerHTML = '<span class="icon">⤢</span>';
          }
      } else {
          const exitFullscreen =
              document.exitFullscreen ||
              (document as any).mozCancelFullScreen ||
              (document as any).webkitExitFullscreen ||
              (document as any).msExitFullscreen;
          if (exitFullscreen) {
              exitFullscreen.call(document);
              this.fullscreenBtn.nativeElement.innerHTML = '<span class="icon">⤡</span>';
          }
      }
    }


  private formatRemainingTime(currentTime: number, duration: number): string {
    if (isNaN(currentTime) || isNaN(duration) || duration === 0) return '-0:00';
    const remaining = Math.max(0, Math.floor(duration - currentTime));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `-${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  private findInitialActiveIndex(): void {
    this.allItems.forEach((item, index) => {
      if (item?.nativeElement?.classList.contains('active-item')) {
        this.currentActiveItemIndex = index;
        this.updateBreadcrumb(item.nativeElement);
      }
    });
  }

  private updateBreadcrumb(item: HTMLElement | null): void {
    if (!item || !this.videoBreadcrumb?.nativeElement) return;
    const breadcrumbText = item.dataset['breadcrumb'] || item.querySelector('.item-details span')?.textContent || 'Course Item';
    this.videoBreadcrumb.nativeElement.textContent = breadcrumbText;
  }

  private setActiveItem(index: number): void {
    if (index < 0 || index >= this.allItems.length || index === this.currentActiveItemIndex) return;

    const currentItemElement = this.allItems[this.currentActiveItemIndex]?.nativeElement;
    if (currentItemElement) {
        currentItemElement.classList.remove('active-item');
    }

    this.currentActiveItemIndex = index;
    const newItemElement = this.allItems[this.currentActiveItemIndex]?.nativeElement;

    if (newItemElement) {
        newItemElement.classList.add('active-item');
        newItemElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        this.updateBreadcrumb(newItemElement);
        console.log('Navigated to item:', newItemElement.dataset['itemId'] || 'Unknown');
    }
  }
}
/* END OF ORIGINAL FILE course-video.component.ts */