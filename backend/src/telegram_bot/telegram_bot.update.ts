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
    const username = ctx.from.first_name + ' ' + ctx.from.last_name;
    const chatId = ctx.chat.id;
    await ctx.reply('Ola ' + username + ' O seu chatId é: ' + chatId);
  }

  @Hears('test')
  async hears(@Ctx() ctx: Scenes.SceneContext) {
    // get username
    this.logger.log('In hears');
    await ctx.reply('Welcome!');
  }
}
