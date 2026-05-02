import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/KPICard";
import { BarChart3, TrendingUp, Users, Package, MapPin, Edit, Trash2, Plus, Info, CheckCircle, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { drivesApi, donationsApi, requestsApi, usersApi } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriveForm } from "@/components/DriveForm";
import { DonationForm } from "@/components/DonationForm";
import { RequestForm } from "@/components/RequestForm";
import { UserForm } from "@/components/UserForm";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("drives");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: drives, isLoading: drivesLoading } = useQuery({
    queryKey: ['drives'],
    queryFn: drivesApi.getAll,
  });

  const { data: donations, isLoading: donationsLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: donationsApi.getAll,
  });

  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: requestsApi.getAll,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAll,
  });

  // Generic Mutation Success Handler
  const handleSuccess = (entity: string, action: string) => {
    queryClient.invalidateQueries({ queryKey: [entity] });
    toast({ title: "Success", description: `${entity} ${action} successfully` });
    setIsCreateOpen(false);
    setEditingItem(null);
  };

  // Generic Mutation Error Handler
  const handleError = (error: any) => {
    toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  // Mutations for Drives
  const driveMutations = {
    create: useMutation({ mutationFn: drivesApi.create, onSuccess: () => handleSuccess('drives', 'created'), onError: handleError }),
    update: useMutation({ mutationFn: ({ id, data }: { id: number, data: any }) => drivesApi.update(id, data), onSuccess: () => handleSuccess('drives', 'updated'), onError: handleError }),
    delete: useMutation({ mutationFn: drivesApi.delete, onSuccess: () => handleSuccess('drives', 'deleted'), onError: handleError })
  };

  // Mutations for Donations
  const donationMutations = {
    create: useMutation({ mutationFn: donationsApi.create, onSuccess: () => handleSuccess('donations', 'created'), onError: handleError }),
    update: useMutation({ mutationFn: ({ id, data }: { id: number, data: any }) => donationsApi.update(id, data), onSuccess: () => handleSuccess('donations', 'updated'), onError: handleError }),
    delete: useMutation({ mutationFn: donationsApi.delete, onSuccess: () => handleSuccess('donations', 'deleted'), onError: handleError })
  };

  // Mutations for Requests
  const requestMutations = {
    create: useMutation({ mutationFn: requestsApi.create, onSuccess: () => handleSuccess('requests', 'created'), onError: handleError }),
    update: useMutation({ mutationFn: ({ id, data }: { id: number, data: any }) => requestsApi.update(id, data), onSuccess: () => handleSuccess('requests', 'updated'), onError: handleError }),
    delete: useMutation({ mutationFn: requestsApi.delete, onSuccess: () => handleSuccess('requests', 'deleted'), onError: handleError })
  };

  // Mutations for Users
  const userMutations = {
    update: useMutation({ mutationFn: ({ id, data }: { id: number, data: any }) => usersApi.update(id, data), onSuccess: () => handleSuccess('users', 'updated'), onError: handleError }),
    delete: useMutation({ mutationFn: usersApi.delete, onSuccess: () => handleSuccess('users', 'deleted'), onError: handleError })
  };

  const handleDelete = (id: number, entity: string, mutation: any) => {
    if (window.confirm(`Are you sure you want to delete this ${entity}?`)) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive platform management and analytics
            </p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              {activeTab !== "users" && (
                <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Plus className="w-5 h-5 mr-2" /> Create New {activeTab.slice(0, -1)}
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create {activeTab.slice(0, -1)}</DialogTitle>
              </DialogHeader>
              {activeTab === "drives" && <DriveForm onSubmit={(v) => driveMutations.create.mutate(v)} isLoading={driveMutations.create.isPending} />}
              {activeTab === "donations" && <DonationForm onSubmit={(v) => donationMutations.create.mutate(v)} isLoading={donationMutations.create.isPending} />}
              {activeTab === "requests" && <RequestForm onSubmit={(v) => requestMutations.create.mutate(v)} isLoading={requestMutations.create.isPending} />}
            </DialogContent>
          </Dialog>
        </div>

        {/* Dashboard KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Donations" value={donations?.length?.toString() || "0"} icon={Package} trend={{ value: 12, isPositive: true }} iconClassName="bg-blue-500/10 text-blue-500" />
          <KPICard title="Active Drives" value={drives?.length?.toString() || "0"} icon={BarChart3} trend={{ value: 5, isPositive: true }} iconClassName="bg-emerald-500/10 text-emerald-500" />
          <KPICard title="Total Users" value={users?.length?.toString() || "0"} icon={Users} trend={{ value: 8, isPositive: true }} iconClassName="bg-purple-500/10 text-purple-500" />
          <KPICard title="Pending Requests" value={requests?.filter((r: any) => r.status === 'PENDING').length.toString() || "0"} icon={Clock} trend={{ value: 3, isPositive: false }} iconClassName="bg-amber-500/10 text-amber-500" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 gap-2">
            <TabsTrigger value="drives" className="rounded-lg py-2.5">Emergency Drives</TabsTrigger>
            <TabsTrigger value="donations" className="rounded-lg py-2.5">Donations</TabsTrigger>
            <TabsTrigger value="requests" className="rounded-lg py-2.5">Requests</TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg py-2.5">Users</TabsTrigger>
          </TabsList>

          <Card className="border-none shadow-xl bg-card overflow-hidden">
            <CardContent className="p-0">
              <TabsContent value="drives" className="m-0">
                <ManagementList 
                  items={drives} 
                  loading={drivesLoading} 
                  onEdit={setEditingItem} 
                  onDelete={(id) => handleDelete(id, 'drive', driveMutations.delete)} 
                  renderItem={(drive) => (
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{drive.title}</h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-md"><MapPin className="w-4 h-4" /> {drive.location}</span>
                        <StatusBadge status={drive.status} />
                      </div>
                    </div>
                  )}
                />
              </TabsContent>

              <TabsContent value="donations" className="m-0">
                <ManagementList 
                  items={donations} 
                  loading={donationsLoading} 
                  onEdit={setEditingItem} 
                  onDelete={(id) => handleDelete(id, 'donation', donationMutations.delete)} 
                  renderItem={(donation) => (
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{donation.item}</h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span className="bg-muted px-2.5 py-1 rounded-md">Qty: {donation.quantity}</span>
                        <span className="bg-muted px-2.5 py-1 rounded-md">Date: {donation.date}</span>
                        <StatusBadge status={donation.status} />
                      </div>
                    </div>
                  )}
                />
              </TabsContent>

              <TabsContent value="requests" className="m-0">
                <ManagementList 
                  items={requests} 
                  loading={requestsLoading} 
                  onEdit={setEditingItem} 
                  onDelete={(id) => handleDelete(id, 'request', requestMutations.delete)} 
                  renderItem={(request) => (
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{request.item}</h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span className="bg-muted px-2.5 py-1 rounded-md">{request.quantityDescription}</span>
                        {request.eta && <span className="bg-muted px-2.5 py-1 rounded-md">ETA: {request.eta}</span>}
                        <StatusBadge status={request.status} />
                      </div>
                    </div>
                  )}
                />
              </TabsContent>

              <TabsContent value="users" className="m-0">
                <ManagementList 
                  items={users} 
                  loading={usersLoading} 
                  onEdit={setEditingItem} 
                  onDelete={(id) => handleDelete(id, 'user', userMutations.delete)} 
                  renderItem={(user) => (
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{user.name}</h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span className="bg-muted px-2.5 py-1 rounded-md">{user.email}</span>
                        <span className={`px-2.5 py-1 rounded-md font-semibold ${
                          user.role === 'ADMIN' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>{user.role}</span>
                      </div>
                    </div>
                  )}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit {activeTab.slice(0, -1)}</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <>
                {activeTab === "drives" && <DriveForm initialValues={editingItem} onSubmit={(v) => driveMutations.update.mutate({ id: editingItem.id, data: v })} isLoading={driveMutations.update.isPending} />}
                {activeTab === "donations" && <DonationForm initialValues={editingItem} onSubmit={(v) => donationMutations.update.mutate({ id: editingItem.id, data: v })} isLoading={donationMutations.update.isPending} />}
                {activeTab === "requests" && <RequestForm initialValues={editingItem} onSubmit={(v) => requestMutations.update.mutate({ id: editingItem.id, data: v })} isLoading={requestMutations.update.isPending} />}
                {activeTab === "users" && <UserForm initialValues={editingItem} onSubmit={(v) => userMutations.update.mutate({ id: editingItem.id, data: v })} isLoading={userMutations.update.isPending} />}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Subcomponents for cleaner code
const ManagementList = ({ items, loading, onEdit, onDelete, renderItem }: any) => {
  if (loading) return (
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}
    </div>
  );

  if (!items || items.length === 0) return (
    <div className="text-center py-20 bg-muted/20">
      <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
      <p className="text-muted-foreground text-lg">No items found</p>
    </div>
  );

  return (
    <div className="divide-y divide-border">
      {items.map((item: any) => (
        <div key={item.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-all duration-200">
          {renderItem(item)}
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline" size="icon" onClick={() => onEdit(item)} className="rounded-full hover:bg-primary hover:text-primary-foreground transform active:scale-95 transition-all">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onDelete(item.id)} className="rounded-full hover:bg-destructive hover:text-destructive-foreground transform active:scale-95 transition-all">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (s: string) => {
    const statusLower = s.toLowerCase();
    if (['active', 'approved', 'fulfilled', 'completed'].includes(statusLower)) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (['pending', 'in_progress'].includes(statusLower)) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    if (['cancelled', 'rejected'].includes(statusLower)) return "bg-destructive/10 text-destructive-600 border-destructive-500/20";
    return "bg-slate-500/10 text-slate-600 border-slate-500/20";
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(status)} transition-all uppercase tracking-wider`}>
      {status}
    </span>
  );
};

export default AdminDashboard;
