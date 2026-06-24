import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.school.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        district: true,
        region: true,
        foundedYear: true,
        director: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        _count: {
          select: {
            users: true,
            students: true,
            staff: true,
            classes: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.school.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        district: true,
        region: true,
        foundedYear: true,
        director: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.school.create({
      data,
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        district: true,
        region: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.school.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        district: true,
        region: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.school.delete({ where: { id } });
  }
}