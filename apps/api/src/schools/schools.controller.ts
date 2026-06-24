// @ts-nocheck
import { Controller, Get, Param, Post, Patch, Delete, Body, UseGuards, Query } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('schools')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @Get()
  @Roles('super_admin', 'ministry_admin', 'district_admin')
  findAll() {
    return this.schoolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Post()
  @Roles('super_admin', 'ministry_admin')
  create(@Body() data: any) {
    return this.schoolsService.create(data);
  }

  @Patch(':id')
  @Roles('super_admin', 'ministry_admin', 'district_admin', 'school_admin')
  update(@Param('id') id: string, @Body() data: any) {
    return this.schoolsService.update(id, data);
  }

  @Delete(':id')
  @Roles('super_admin', 'ministry_admin')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }
}