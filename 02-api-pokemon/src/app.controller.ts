import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Lista todos os endpoints da API no formato JSON' })
  @ApiResponse({
    status: 200,
    description: 'Lista dos endpoints da api pokemon'
  })
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
