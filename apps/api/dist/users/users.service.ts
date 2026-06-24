import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: UserRole, schoolId?: string) {
    const where: any = {};
    if (role) where.role = role;
    if (schoolId) where.schoolId = schoolId;

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatar: true,
        role: true,
        status: true,
        schoolId: true,
        school: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatar: true,
        role: true,
        status: true,
        schoolId: true,
        school: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        avatar: true,
        role: true,
        status: true,
        schoolId: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}