import {Injectable} from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Contains in-progress loading requests
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();



  constructor(private toast: HotToastService) {
  }

  showSuccess(msg: string, time = 3000): void {
    this.toast.success(msg, {
      duration: time,
    });
  }


  showFail(msg: string, duration = 3000): void {
    this.toast.error(msg, {
      duration,
    });
  }

  loading(value: string): void {
    this.toast.loading(value, {id: 'loading', position: 'top-center'});
  }

  stopLoading(): void {
    this.toast.close('loading');
  }



  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    }else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }
}
