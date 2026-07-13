'use client'
import DashboardLayout from '@/app/Components/Layout/DashboardLayout'
import React from 'react'
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  CalendarCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  ChevronRight, 
  Percent 
} from 'lucide-react'
import Link from 'next/link'

function Homepage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,259.50",
      change: "+14.2%",
      isPositive: true,
      timeframe: "vs last month",
      icon: DollarSign,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Products in Catalog",
      value: "25 Items",
      change: "+2 new",
      isPositive: true,
      timeframe: "added this week",
      icon: Package,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Active Bookings",
      value: "18 Active",
      change: "-3.5%",
      isPositive: false,
      timeframe: "vs yesterday",
      icon: CalendarCheck,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Conversion Rate",
      value: "4.82%",
      change: "+0.8%",
      isPositive: true,
      timeframe: "vs last month",
      icon: Percent,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
  ]

  

  
  return (
    <DashboardLayout>
      <div className="space-y-8 p-1">
        {/*  */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back, Admin 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here is your overview for the B2B catalog and bookings status.
            </p>
          </div>
          
        </div>

        {/*  */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="rounded-xl border border-gray-150 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{stat.title}</span>
                  <div className={`p-2.5 rounded-lg ${stat.iconColor}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
                    <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 ${
                      stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stat.change}
                    </span>
                    <span className="text-gray-400 font-normal">{stat.timeframe}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        
      </div>
    </DashboardLayout>
  )
}

export default Homepage