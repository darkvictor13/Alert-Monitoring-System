import { Injectable, Logger } from '@nestjs/common';
import { createWriteStream, readFileSync } from 'fs';

@Injectable()
export class FileService {
  private readonly logger: Logger = new Logger(FileService.name);

  writeFileSync(filename: string, data: Buffer): boolean {
    try {
      const ws = createWriteStream(filename);
      ws.write(data);
      return true;
    } catch (e) {
      this.logger.error('Error writing file', filename, e);
      return false;
    }
  }

  getFile(filename: string): Buffer {
    return readFileSync(filename);
  }
}
