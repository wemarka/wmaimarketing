
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, ShieldCheck, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminRoles = () => {
  // Mock data for roles
  const roles = [
    { id: 1, name: "مدير النظام", users: 2, permissions: 15 },
    { id: 2, name: "مسؤول تسويق", users: 5, permissions: 10 },
    { id: 3, name: "محرر محتوى", users: 8, permissions: 7 },
    { id: 4, name: "مستخدم", users: 20, permissions: 3 },
  ];

  return (
    <Layout>
      <Helmet>
        <title>إدارة الصلاحيات - سيركل</title>
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" /> إدارة الصلاحيات
            </h1>
            <p className="text-muted-foreground">تعريف وإدارة أدوار المستخدمين والصلاحيات</p>
          </div>
          <Button className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            دور جديد
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الدور</TableHead>
                  <TableHead>عدد المستخدمين</TableHead>
                  <TableHead>الصلاحيات</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.users}</TableCell>
                    <TableCell>{role.permissions}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">تعديل</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminRoles;
