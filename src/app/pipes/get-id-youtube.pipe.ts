import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getIdYoutube'
})
export class GetIdYoutubePipe implements PipeTransform {

  transform(value: any): any {
    try {
      const parsedUrl = new URL(value);

      // https://youtube.com/shorts/ID
      if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname.startsWith('/shorts/')) {
        return parsedUrl.pathname.split('/')[2];
      }

      // https://www.youtube.com/watch?v=ID
      if (parsedUrl.searchParams.has('v')) {
        return parsedUrl.searchParams.get('v');
      }

      // https://youtu.be/ID
      if (parsedUrl.hostname === 'youtu.be') {
        return parsedUrl.pathname.substring(1);
      }

      return null;
    } catch (e) {
      return null;
    }
  }

}
