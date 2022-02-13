import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './link.entity';
import { ParseURLPipe } from '../../utils/pipes/parse-url';
import { JWTGuard } from '../../utils/guards/jwt.guard';
import { GetUserId } from '../../utils/decorators/get-user-id';

@Controller('url')
@UseGuards(JWTGuard)
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('me')
  async getBatch(@GetUserId() userId: number): Promise<Link[]> {
    return this.linkService.getBatch(userId);
  }

  @Post('shorten')
  async shorten(
    @Query('url', ParseURLPipe) longUrl: string,
    @GetUserId() userId: number,
  ): Promise<Link> {
    return this.linkService.shorten(longUrl, userId);
  }

  @Delete(':token')
  async deleteAssociated(
    @Param('token') shortUrl: string,
    @GetUserId() userId: number,
  ): Promise<void> {
    return this.linkService.deleteAssociated(shortUrl, userId);
  }

  @Get(':token')
  async redirect(
    @Param('token') shortUrl: string,
    @GetUserId() userId: number,
  ): Promise<string> {
    return this.linkService.redirect(shortUrl, userId);
  }

  @Put(':token')
  async updateOrigin(
    @Param('token') shortUrl: string,
    @Query('url', ParseURLPipe) longUrl: string,
    @GetUserId() userId: number,
  ): Promise<void> {
    return this.linkService.updateOrigin(shortUrl, longUrl, userId);
  }
}
