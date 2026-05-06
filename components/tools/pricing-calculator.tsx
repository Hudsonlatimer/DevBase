"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calculator, RefreshCw, DollarSign, Clock, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PricingCalculator() {
  const [hourlyRate, setHourlyRate] = useState<number>(100);
  const [estimatedHours, setEstimatedHours] = useState<number>(40);
  const [contingency, setContingency] = useState<number>(20);
  const [expenses, setExpenses] = useState<number>(0);
  
  const [total, setTotal] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const subtotal = hourlyRate * estimatedHours;
    const contingencyAmount = subtotal * (contingency / 100);
    const finalPrice = subtotal + contingencyAmount + expenses;
    setTotal(finalPrice);
    setProfit(finalPrice - expenses);
  }, [hourlyRate, estimatedHours, contingency, expenses]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="rate" className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <DollarSign className="size-3" /> Hourly Rate
            </Label>
            <Input 
              id="rate" 
              type="number" 
              value={hourlyRate} 
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-lg text-white" 
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="hours" className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Clock className="size-3" /> Estimated Hours
            </Label>
            <Input 
              id="hours" 
              type="number" 
              value={estimatedHours} 
              onChange={(e) => setEstimatedHours(Number(e.target.value))}
              className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-lg text-white" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="contingency" className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Percent className="size-3" /> Contingency (%)
            </Label>
            <Input 
              id="contingency" 
              type="number" 
              value={contingency} 
              onChange={(e) => setContingency(Number(e.target.value))}
              className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-lg text-white" 
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="expenses" className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <RefreshCw className="size-3" /> Fixed Expenses
            </Label>
            <Input 
              id="expenses" 
              type="number" 
              value={expenses} 
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="h-12 bg-zinc-950 border-zinc-800 rounded-xl focus:ring-primary font-bold text-lg text-white" 
            />
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-800 flex justify-between items-center">
          <p className="text-sm text-zinc-500 font-bold italic">Estimate builds faster with DevBase.</p>
          <Button variant="ghost" onClick={() => {
            setHourlyRate(100);
            setEstimatedHours(40);
            setContingency(20);
            setExpenses(0);
          }} className="text-zinc-500 hover:text-white font-bold text-xs uppercase tracking-widest">
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-primary border border-primary/20 rounded-3xl p-10 text-black shadow-2xl flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <p className="font-bold uppercase tracking-widest text-xs opacity-60 mb-4">Recommended Quote</p>
            <div className="text-6xl font-black tracking-tighter mb-4">{formatter.format(total)}</div>
            <p className="font-medium text-black/60 leading-relaxed">
              Based on {estimatedHours} hours at {formatter.format(hourlyRate)}/hr, plus a {contingency}% buffer for scope creep.
            </p>
          </div>
          <Button asChild className="bg-black text-white hover:bg-zinc-900 rounded-2xl h-14 font-black mt-8 text-lg">
            <Link href="/finance/new">Create Invoice</Link>
          </Button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Projected Profit</p>
            <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Healthy</span>
          </div>
          <div className="text-3xl font-black tracking-tighter mb-2 text-white">{formatter.format(profit)}</div>
          <p className="text-zinc-500 text-xs font-bold">Your take-home after fixed expenses.</p>
        </div>
      </div>
    </div>
  );
}
