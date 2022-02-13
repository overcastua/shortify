import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkRepository } from './link.repository';
import { Link } from './link.entity';
import { generate } from 'shortid';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkRepository)
    private readonly linkRepository: LinkRepository,
  ) {}

  async shorten(url: string, userId: number): Promise<Link> {
    const existing = await this.linkRepository.findOne({
      originUrl: url,
      userId,
    });
    if (existing) return existing;

    const shortUrl = generate();
    return this.linkRepository.save({
      originUrl: url,
      tokenizedUrl: shortUrl,
      userId,
    });
  }

  async redirect(shortUrl: string): Promise<string> {
    const origin = await this.linkRepository.findOne({
      tokenizedUrl: shortUrl,
    });

    if (!origin)
      throw new NotFoundException('There is no url associated with this token');

    return origin.originUrl;
  }

  async getBatch(userId: number): Promise<Link[]> {
    return this.linkRepository.find({
      userId,
    });
  }

  async deleteAssociated(shortUrl: string, userId: number): Promise<void> {
    const result = await this.linkRepository.delete({
      tokenizedUrl: shortUrl,
      userId,
    });

    if (result.affected === 0)
      throw new NotFoundException('There is no url associated with this token');
  }

  async updateOrigin(
    shortUrl: string,
    longUrl: string,
    userId: number,
  ): Promise<void> {
    const result = await this.linkRepository.update(
      {
        tokenizedUrl: shortUrl,
        userId,
      },
      { originUrl: longUrl },
    );

    if (result.affected === 0)
      throw new NotFoundException('There is no url associated with this token');
  }
}
