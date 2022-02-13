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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Profile } from '../profile/profile.entity';

@ApiTags('Main Logic')
@Controller('url')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get your all shortened urls' })
  @Get('me')
  @ApiCreatedResponse({
    description: 'All your links.',
    type: () => Link,
    isArray: true,
  })
  @UseGuards(JWTGuard)
  async getBatch(@GetUserId() userId: number): Promise<Link[]> {
    return this.linkService.getBatch(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Shorten url' })
  @Post('shorten')
  @ApiCreatedResponse({
    description: 'Association created.',
    type: () => Link,
  })
  @ApiBadRequestResponse({
    description: 'Provided url is invalid.',
  })
  @UseGuards(JWTGuard)
  async shorten(
    @Query('url', ParseURLPipe) longUrl: string,
    @GetUserId() userId: number,
  ): Promise<Link> {
    return this.linkService.shorten(longUrl, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete shortened url' })
  @Delete(':token')
  @ApiNotFoundResponse({
    description: 'There is no origin link associated with this token.',
  })
  @ApiNoContentResponse({ description: 'The association was deleted' })
  @UseGuards(JWTGuard)
  async deleteAssociated(
    @Param('token') shortUrl: string,
    @GetUserId() userId: number,
  ): Promise<void> {
    return this.linkService.deleteAssociated(shortUrl, userId);
  }

  @ApiOperation({ summary: 'Get origin url' })
  @Get(':token')
  @ApiOkResponse({
    description: 'Returns origin link.',
    type: () => String,
  })
  @ApiNotFoundResponse({
    description: 'There is no origin link associated with this token.',
  })
  async redirect(@Param('token') shortUrl: string): Promise<string> {
    return this.linkService.redirect(shortUrl);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update origin url' })
  @Put(':token')
  @ApiCreatedResponse({
    description: 'Origin url was successfully updated.',
    type: () => Link,
  })
  @ApiNotFoundResponse({
    description: 'There is no origin link associated with this token.',
  })
  @ApiBadRequestResponse({
    description: 'Provided url is invalid.',
  })
  @UseGuards(JWTGuard)
  async updateOrigin(
    @Param('token') shortUrl: string,
    @Query('url', ParseURLPipe) longUrl: string,
    @GetUserId() userId: number,
  ): Promise<void> {
    return this.linkService.updateOrigin(shortUrl, longUrl, userId);
  }
}
