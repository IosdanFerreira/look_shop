import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { isPublic } from './decorators/isPublic.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @isPublic()
  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @isPublic()
  @Post('refreshToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Req() req) {
    return this.authService.refresh(req.user);
  }
}
