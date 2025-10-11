import { ReportBaseDto } from './report-base-dto';

export class ReportInfoDto {
  hasData: boolean = false;
  message: string = '';
  reportBaseDto: ReportBaseDto;
  data?: Record<string, any>[];
}
