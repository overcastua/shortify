import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('About')
@Controller('about')
export class AppController {
  @ApiOperation({ summary: 'Get information about the service' })
  @Get()
  @ApiOkResponse({
    description: 'Description of Shortify.',
    type: () => String,
  })
  about(): string {
    return 'Shortify was designed to shorten long URLs to make them look prettier! Try it out!';
  }
}
