import { Injectable, Logger } from '@nestjs/common';

@Injectable()
class LogService {
  private readonly logger = new Logger(LogService.name);

  info(message: string, data?: any) {
    this.logger.log(
      `[INFO] ${new Date().toISOString()} - ${message}`,
      data || '',
    );
  }

  warn(message: string, data?: any) {
    this.logger.warn(
      `[WARN] ${new Date().toISOString()} - ${message}`,
      data || '',
    );
  }

  error(message: string, error?: any) {
    this.logger.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      error || '',
    );
  }
}

export default LogService;
