// @ts-nocheck
import { Controller, Get, Param, Patch, Delete, Body, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('super_admin', 'ministry_admin', 'district_admin', 'school_admin')
  findAll(@Query('role') role?: string, @Query('schoolId') schoolId?: string) {
    return this.usersService.findAll(role as any, schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles('super_admin', 'school_admin')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @Roles('super_admin', 'school_admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}