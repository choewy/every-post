import { Bottom, Middle, Top } from '@/entities';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TestService {
  private readonly logger = new Logger();

  private readonly topRepo: Repository<Top>;
  private readonly middleRepo: Repository<Middle>;
  private readonly bottomRepo: Repository<Bottom>;

  constructor(private readonly dataSource: DataSource) {
    this.topRepo = this.dataSource.getRepository(Top);
    this.middleRepo = this.dataSource.getRepository(Middle);
    this.bottomRepo = this.dataSource.getRepository(Bottom);
  }

  async saveTopWithMiddle() {
    const middle = new Middle();
    middle.name = this.saveTopWithMiddle.name;

    const top = new Top();
    top.name = this.saveTopWithMiddle.name;
    top.middles = [middle];

    await this.topRepo.save(top);
  }

  async saveTopWithBottom() {
    const bottom = new Bottom();
    bottom.name = this.saveTopWithBottom.name;

    const top = new Top();
    top.name = this.saveTopWithBottom.name;
    top.bottoms = [bottom];

    await this.topRepo.save(top);
  }

  async saveTopWithMiddleAndBottom() {
    try {
      const bottom = new Bottom();
      bottom.name = this.saveTopWithMiddleAndBottom.name;

      const middle = new Middle();
      middle.name = this.saveTopWithMiddleAndBottom.name;
      middle.bottoms = [bottom];

      const top = new Top();
      top.name = this.saveTopWithMiddleAndBottom.name;
      top.middles = [middle];
      top.bottoms = [bottom];

      await this.topRepo.save(top);
    } catch (e) {
      this.logger.error(e.message, '', this.saveTopWithMiddleAndBottom.name);
    }
  }

  async saveMiddleWithTopAndBottom() {
    try {
      const top = new Top();
      top.name = this.saveMiddleWithTopAndBottom.name;

      const bottom = new Bottom();
      bottom.name = this.saveTopWithMiddleAndBottom.name;

      const middle = new Middle();
      middle.name = this.saveTopWithMiddleAndBottom.name;
      middle.bottoms = [bottom];
      middle.top = top;

      await this.middleRepo.save(middle);
    } catch (e) {
      this.logger.error(e.message, '', this.saveMiddleWithTopAndBottom.name);
    }
  }

  async saveBottomWithTopAndMiddle() {
    try {
      const top = new Top();
      top.name = this.saveBottomWithTopAndMiddle.name;

      const middle = new Middle();
      middle.name = this.saveBottomWithTopAndMiddle.name;
      middle.top = top;

      const bottom = new Bottom();
      bottom.name = this.saveBottomWithTopAndMiddle.name;
      bottom.top = top;
      bottom.middle = middle;

      await this.bottomRepo.save(bottom);
    } catch (e) {
      this.logger.error(e.message, '', this.saveBottomWithTopAndMiddle.name);
    }
  }
}
