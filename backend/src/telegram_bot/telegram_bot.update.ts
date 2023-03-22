import { Logger } from '@nestjs/common';
import { Update, Ctx, Start, Help, Hears } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';

@Update()
export class TelegramBotUpdate {
  private readonly logger: Logger = new Logger(TelegramBotUpdate.name);

  @Start()
  @Help()
  async start(@Ctx() ctx: Scenes.SceneContext) {
    this.logger.log('In start');
    await ctx.reply('Welcome!');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Scenes.SceneContext) {
    console.log(ctx);
    this.logger.log('In hears');
    await ctx.reply('Hey there');
  }
}
