import React, { useState } from "react";

function Dashboard() {
  const amountRaisedCad = 275000; // fictional
  const totalInvestors = 36; // fictional
  const goalAmount = 500000; // fictional goal
  const progressPercentage = Math.min((amountRaisedCad / goalAmount) * 100, 100);
  const isGoalReached = amountRaisedCad >= goalAmount;

  // Expense tracking state
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Office rent", amount: 2500, category: "Operations", date: "2025-01-15" },
    { id: 2, description: "Software licenses", amount: 800, category: "Technology", date: "2025-01-10" },
    { id: 3, description: "Marketing campaign", amount: 1500, category: "Marketing", date: "2025-01-08" },
  ]);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", category: "Operations", date: "" });
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);

  // Business KPIs and Metrics (now editable) - moved to top
  const [businessMetrics, setBusinessMetrics] = useState({
    // Revenue Metrics
    mrr: 12500, // Monthly Recurring Revenue
    arr: 150000, // Annual Recurring Revenue
    revenueGrowth: 18.5, // Month-over-month growth %
    
    // Customer Metrics
    totalCustomers: 245,
    newCustomersThisMonth: 32,
    churnRate: 3.2, // Monthly churn %
    customerLifetimeValue: 2400,
    customerAcquisitionCost: 180,
    
    // Product Metrics
    monthlyActiveUsers: 1890,
    userGrowth: 12.3,
    featureAdoption: 68.5,
    npsScore: 42,
    
    // Team Metrics
    teamSize: 8,
    openPositions: 3,
    employeeSatisfaction: 4.2,
    
    // Market Metrics
    marketShare: 0.8, // %
    competitorCount: 12,
    marketGrowth: 15.2
  });

  // Goal tracking state
  const [goals, setGoals] = useState([
    { id: 1, title: "Reach $20K MRR", target: 20000, current: 12500, deadline: "2025-03-31", status: "in_progress" },
    { id: 2, title: "Acquire 300 customers", target: 300, current: 245, deadline: "2025-04-15", status: "in_progress" },
    { id: 3, title: "Reduce churn to 2%", target: 2, current: 3.2, deadline: "2025-02-28", status: "at_risk" },
    { id: 4, title: "Hire 3 engineers", target: 3, current: 1, deadline: "2025-03-15", status: "in_progress" },
  ]);

  // Team management state
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Sarah Chen", role: "CEO", department: "Leadership", startDate: "2024-01-15", status: "active" },
    { id: 2, name: "Mike Rodriguez", role: "CTO", department: "Engineering", startDate: "2024-02-01", status: "active" },
    { id: 3, name: "Emily Johnson", role: "Head of Sales", department: "Sales", startDate: "2024-03-10", status: "active" },
    { id: 4, name: "Alex Kim", role: "Product Manager", department: "Product", startDate: "2024-04-05", status: "active" },
  ]);

  // Market intelligence data
  const marketData = {
    competitors: [
      { name: "Competitor A", funding: 5000000, employees: 25, marketShare: 15.2 },
      { name: "Competitor B", funding: 12000000, employees: 45, marketShare: 22.8 },
      { name: "Competitor C", funding: 3000000, employees: 18, marketShare: 8.5 },
    ],
    recentFunding: [
      { company: "TechStart Inc", amount: 15000000, round: "Series A", date: "2025-01-10" },
      { company: "InnovateLab", amount: 8000000, round: "Seed", date: "2025-01-08" },
      { company: "FutureTech", amount: 25000000, round: "Series B", date: "2025-01-05" },
    ]
  };

  // Expense management functions
  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      const expense = {
        id: Date.now(),
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({ description: "", amount: "", category: "Operations", date: "" });
      setShowAddForm(false);
    }
  };

  const editExpense = (id) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setNewExpense({
        description: expense.description,
        amount: expense.amount.toString(),
        category: expense.category,
        date: expense.date
      });
      setEditingId(id);
      setShowAddForm(true);
    }
  };

  const updateExpense = () => {
    if (editingId && newExpense.description && newExpense.amount && newExpense.date) {
      setExpenses(expenses.map(expense => 
        expense.id === editingId 
          ? { ...expense, ...newExpense, amount: parseFloat(newExpense.amount) }
          : expense
      ));
      setNewExpense({ description: "", amount: "", category: "Operations", date: "" });
      setEditingId(null);
      setShowAddForm(false);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const cancelEdit = () => {
    setNewExpense({ description: "", amount: "", category: "Operations", date: "" });
    setEditingId(null);
    setShowAddForm(false);
  };

  // Metric editing functions
  const startEditingMetric = (metricKey) => {
    setEditingMetric(metricKey);
  };

  const updateMetric = (metricKey, value) => {
    const newValue = parseFloat(value) || 0;
    setBusinessMetrics(prev => ({
      ...prev,
      [metricKey]: newValue
    }));
    
    // Auto-update related goals when business metrics change
    if (metricKey === 'totalCustomers') {
      setGoals(prev => prev.map(goal => {
        if (goal.title.includes('customers') && goal.title.includes('Acquire')) {
          const updatedGoal = { ...goal, current: newValue };
          if (newValue >= goal.target) {
            updatedGoal.status = 'completed';
          } else if (newValue >= goal.target * 0.8) {
            updatedGoal.status = 'in_progress';
          } else {
            updatedGoal.status = 'at_risk';
          }
          return updatedGoal;
        }
        return goal;
      }));
    }
    
    if (metricKey === 'mrr') {
      setGoals(prev => prev.map(goal => {
        if (goal.title.includes('MRR') && goal.title.includes('$')) {
          const updatedGoal = { ...goal, current: newValue };
          if (newValue >= goal.target) {
            updatedGoal.status = 'completed';
          } else if (newValue >= goal.target * 0.8) {
            updatedGoal.status = 'in_progress';
          } else {
            updatedGoal.status = 'at_risk';
          }
          return updatedGoal;
        }
        return goal;
      }));
    }
    
    if (metricKey === 'churnRate') {
      setGoals(prev => prev.map(goal => {
        if (goal.title.includes('churn') && goal.title.includes('Reduce')) {
          const updatedGoal = { ...goal, current: newValue };
          // For churn rate, lower is better, so we check if current <= target
          if (newValue <= goal.target) {
            updatedGoal.status = 'completed';
          } else if (newValue <= goal.target * 1.2) {
            updatedGoal.status = 'in_progress';
          } else {
            updatedGoal.status = 'at_risk';
          }
          return updatedGoal;
        }
        return goal;
      }));
    }
    
    setEditingMetric(null);
  };

  const cancelMetricEdit = () => {
    setEditingMetric(null);
  };

  // Goal editing functions
  const startEditingGoal = (goalId) => {
    setEditingGoal(goalId);
  };

  const updateGoal = (goalId, field, value) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = { 
          ...goal, 
          [field]: field === 'title' || field === 'deadline' ? value : parseFloat(value) || 0 
        };
        
        // Auto-update status based on current vs target
        if (field === 'current' || field === 'target') {
          const current = field === 'current' ? parseFloat(value) || 0 : updatedGoal.current;
          const target = field === 'target' ? parseFloat(value) || 0 : updatedGoal.target;
          
          if (current >= target) {
            updatedGoal.status = 'completed';
          } else if (current >= target * 0.8) {
            updatedGoal.status = 'in_progress';
          } else {
            updatedGoal.status = 'at_risk';
          }
        }
        
        return updatedGoal;
      }
      return goal;
    }));
  };

  const saveGoal = (goalId) => {
    setEditingGoal(null);
  };

  // Team member editing functions
  const startEditingTeamMember = (memberId) => {
    setEditingTeamMember(memberId);
  };

  const updateTeamMember = (memberId, field, value) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, [field]: value }
        : member
    ));
  };

  const saveTeamMember = (memberId) => {
    setEditingTeamMember(null);
  };

  // Editable Metric Component
  const EditableMetric = ({ label, value, metricKey, format = "number", color = "text-white", onClick }) => {
    const [editValue, setEditValue] = useState(value.toString());
    
    // Update editValue when the actual value changes
    React.useEffect(() => {
      setEditValue(value.toString());
    }, [value]);
    
    if (editingMetric === metricKey) {
      return (
        <div className="space-y-2">
          <div className="text-white/60 text-sm">{label}</div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  updateMetric(metricKey, editValue);
                }
              }}
              className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-2xl font-bold w-32"
              autoFocus
            />
            <button
              onClick={() => updateMetric(metricKey, editValue)}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
            >
              ✓
            </button>
            <button
              onClick={cancelMetricEdit}
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      );
    }

    const formattedValue = format === "currency" 
      ? new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value)
      : format === "percentage"
      ? `${value}%`
      : value.toLocaleString();

    return (
      <div 
        className="cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors"
        onClick={() => startEditingMetric(metricKey)}
      >
        <div className="text-white/60 text-sm">{label}</div>
        <div className={`text-3xl font-bold mt-2 ${color} transition-all duration-300`}>
          {formattedValue}
        </div>
        <div className="text-xs text-white/40 mt-1">Click to edit</div>
      </div>
    );
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate burn rate based on current month's expenses
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  
  const monthlyBurnRate = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate runway (months of funding left) - updates when metrics change
  const remainingFunds = amountRaisedCad - totalExpenses;
  const runwayMonths = monthlyBurnRate > 0 ? Math.floor(remainingFunds / monthlyBurnRate) : 0;
  
  // Calculate new customer acquisition rate
  const newCustomerRate = businessMetrics.newCustomersThisMonth;
  const customerGrowthRate = (newCustomerRate / businessMetrics.totalCustomers) * 100;
  
  // Calculate average burn rate over last 3 months
  const last3Months = [];
  for (let i = 0; i < 3; i++) {
    const month = new Date(currentYear, currentMonth - i, 1);
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === month.getMonth() && expenseDate.getFullYear() === month.getFullYear();
    });
    const monthTotal = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    last3Months.push(monthTotal);
  }
  
  const avgBurnRate = last3Months.reduce((sum, rate) => sum + rate, 0) / 3;


  // Calculate derived metrics (these will update automatically when businessMetrics changes)
  const ltvCacRatio = businessMetrics.customerLifetimeValue / businessMetrics.customerAcquisitionCost;
  const monthlyChurn = businessMetrics.churnRate / 100;
  const customerRetention = 100 - businessMetrics.churnRate;
  
  // Update ARR when MRR changes
  const updatedArr = businessMetrics.mrr * 12;
  
  const tips = [
    "Tighten your problem statement to a one-sentence pitch.",
    "Show traction: add a quick KPI sparklines slide.",
    "Lead with a crisp ask (amount, runway, use of funds).",
    "Collect 2-3 short investor testimonials as social proof.",
    "Warm intros outperform cold outreach—leverage your existing network.",
  ];
  const investorUpdates = [
    { id: 1, date: "2025-09-10", message: "Closed 3 pilot customers; MRR up 18% MoM." },
    { id: 2, date: "2025-09-05", message: "Hired founding engineer; sprint velocity +22%." },
    { id: 3, date: "2025-08-28", message: "Secured LOIs totaling $90k ARR pipeline." },
    { id: 4, date: "2025-08-19", message: "Beta churn reduced from 9% to 4.5% via onboarding revamp." },
    { id: 5, date: "2025-08-11", message: "Opened a new angel allocation; targeting strategic operators." },
  ];

  const formattedCad = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amountRaisedCad);

  const formattedGoal = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(goalAmount);

  // Pie chart calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(135deg,#0b0720,#1a1440)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Startup Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              S
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">StartupName</h1>
          <p className="text-white/70">Founder Dashboard - Snapshot of your fundraising progress</p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
            <div className="text-white/80 text-sm mb-4">Amount Raised & Progress</div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-4xl font-extrabold mb-2">{formattedCad}</div>
                <div className="text-sm text-white/80">Goal: {formattedGoal}</div>
                <div className="mt-2 text-white/60 text-sm">Fictional demo data</div>
              </div>
              <div className="ml-6">
                <div className="relative">
                  <svg width="120" height="120" className="transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke={isGoalReached ? "#10b981" : "#8b5cf6"}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 50}
                      strokeDashoffset={2 * Math.PI * 50 - (progressPercentage / 100) * (2 * Math.PI * 50)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-in-out hover:stroke-opacity-80"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold">{progressPercentage.toFixed(0)}%</div>
                      <div className="text-xs text-white/60">of goal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className={`text-sm ${isGoalReached ? 'text-green-400' : 'text-yellow-400'}`}>
                {isGoalReached ? '🎉 Goal Reached!' : 'In Progress'}
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
            <div className="text-white/80 text-sm">Total Investors</div>
            <div className="mt-2 text-4xl font-extrabold">{totalInvestors}</div>
            <div className="mt-1 text-white/60 text-sm">Fictional demo data</div>
          </div>
        </div>

        {/* Business KPIs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Business KPIs <span className="text-sm text-white/60 font-normal">(Click any metric to edit)</span></h2>
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Metrics update in real-time when you edit values</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Revenue Metrics */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <EditableMetric 
                label="Monthly Recurring Revenue"
                value={businessMetrics.mrr}
                metricKey="mrr"
                format="currency"
                color="text-green-400"
              />
              <div className="text-green-400 text-sm mt-1">+{businessMetrics.revenueGrowth}% MoM</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <div className="cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('mrr')}>
                <div className="text-white/60 text-sm">Annual Recurring Revenue</div>
                <div className="text-3xl font-bold text-blue-400 mt-2">
                  {editingMetric === 'mrr' ? (
                    <input
                      type="number"
                      value={businessMetrics.mrr}
                      onChange={(e) => setBusinessMetrics(prev => ({...prev, mrr: parseFloat(e.target.value) || 0}))}
                      className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-2xl font-bold w-32"
                      autoFocus
                    />
                  ) : (
                    new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(updatedArr)
                  )}
                </div>
                <div className="flex items-center gap-2 text-blue-400 text-sm mt-1">
                  <span>Auto-calculated from MRR</span>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" title="Live calculation"></div>
                </div>
                <div className="text-xs text-white/40 mt-1">Click MRR to edit</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <EditableMetric 
                label="Total Customers"
                value={businessMetrics.totalCustomers}
                metricKey="totalCustomers"
                format="number"
                color="text-purple-400"
              />
              <div className="flex items-center gap-2 text-purple-400 text-sm mt-1">
                <span>+{businessMetrics.newCustomersThisMonth} this month ({customerGrowthRate.toFixed(1)}% growth)</span>
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" title="Auto-calculated"></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <EditableMetric 
                label="Churn Rate"
                value={businessMetrics.churnRate}
                metricKey="churnRate"
                format="percentage"
                color={businessMetrics.churnRate < 5 ? 'text-green-400' : businessMetrics.churnRate < 10 ? 'text-yellow-400' : 'text-red-400'}
              />
              <div className="text-white/60 text-sm mt-1">{customerRetention}% retention</div>
            </div>
          </div>
        </div>

        {/* Customer & Product Metrics */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Customer Health <span className="text-sm text-white/60 font-normal">(Click to edit)</span></h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('customerLifetimeValue')}>
                  <span className="text-white/80">Customer Lifetime Value</span>
                  <span className="text-white font-bold">
                    {editingMetric === 'customerLifetimeValue' ? (
                      <input
                        type="number"
                        value={businessMetrics.customerLifetimeValue}
                        onChange={(e) => setBusinessMetrics(prev => ({...prev, customerLifetimeValue: parseFloat(e.target.value) || 0}))}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-bold w-24"
                        autoFocus
                      />
                    ) : (
                      new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(businessMetrics.customerLifetimeValue)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('customerAcquisitionCost')}>
                  <span className="text-white/80">Customer Acquisition Cost</span>
                  <span className="text-white font-bold">
                    {editingMetric === 'customerAcquisitionCost' ? (
                      <input
                        type="number"
                        value={businessMetrics.customerAcquisitionCost}
                        onChange={(e) => setBusinessMetrics(prev => ({...prev, customerAcquisitionCost: parseFloat(e.target.value) || 0}))}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-bold w-24"
                        autoFocus
                      />
                    ) : (
                      new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(businessMetrics.customerAcquisitionCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">LTV/CAC Ratio</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold transition-all duration-300 ${ltvCacRatio > 3 ? 'text-green-400' : ltvCacRatio > 1 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {ltvCacRatio.toFixed(1)}x
                    </span>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" title="Auto-calculated"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('npsScore')}>
                  <span className="text-white/80">NPS Score</span>
                  <span className={`font-bold ${businessMetrics.npsScore > 50 ? 'text-green-400' : businessMetrics.npsScore > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {editingMetric === 'npsScore' ? (
                      <input
                        type="number"
                        value={businessMetrics.npsScore}
                        onChange={(e) => setBusinessMetrics(prev => ({...prev, npsScore: parseFloat(e.target.value) || 0}))}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-bold w-16"
                        autoFocus
                      />
                    ) : (
                      businessMetrics.npsScore
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Product Metrics <span className="text-sm text-white/60 font-normal">(Click to edit)</span></h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('monthlyActiveUsers')}>
                  <span className="text-white/80">Monthly Active Users</span>
                  <span className="text-white font-bold">
                    {editingMetric === 'monthlyActiveUsers' ? (
                      <input
                        type="number"
                        value={businessMetrics.monthlyActiveUsers}
                        onChange={(e) => setBusinessMetrics(prev => ({...prev, monthlyActiveUsers: parseFloat(e.target.value) || 0}))}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-bold w-24"
                        autoFocus
                      />
                    ) : (
                      businessMetrics.monthlyActiveUsers.toLocaleString()
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('userGrowth')}>
                  <span className="text-white/80">User Growth</span>
                  <span className="text-green-400 font-bold">
                    {editingMetric === 'userGrowth' ? (
                      <input
                        type="number"
                        value={businessMetrics.userGrowth}
                        onChange={(e) => setBusinessMetrics(prev => ({...prev, userGrowth: parseFloat(e.target.value) || 0}))}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-bold w-20"
                        autoFocus
                      />
                    ) : (
                      `+${businessMetrics.userGrowth}%`
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('featureAdoption')}>
                  <span className="text-white/80">Feature Adoption</span>
                  <span className="text-blue-400 font-bold">
                    {editingMetric === 'featureAdoption' ? (
                      <input
                        type="number"
                        value={businessMetrics.featureAdoption}
                        onChange={(e) => setBusinessMetrics(prev => ({...prev, featureAdoption: parseFloat(e.target.value) || 0}))}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-bold w-20"
                        autoFocus
                      />
                    ) : (
                      `${businessMetrics.featureAdoption}%`
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors" onClick={() => startEditingMetric('teamSize')}>
                  <span className="text-white/80">Team Size</span>
                  <span className="text-white font-bold">
                    {editingMetric === 'teamSize' ? (
                      <input
                        type="number"
                        value={businessMetrics.teamSize}
                        onChange={(e) => setBusinessMetrics(prev => ({...prev, teamSize: parseFloat(e.target.value) || 0}))}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-bold w-16"
                        autoFocus
                      />
                    ) : (
                      `${businessMetrics.teamSize} people`
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals & OKRs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Goals & OKRs <span className="text-sm text-white/60 font-normal">(Click to edit)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map(goal => {
              const progress = (goal.current / goal.target) * 100;
              const isOverdue = new Date(goal.deadline) < new Date();
              return (
                <div key={goal.id} className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    {editingGoal === goal.id ? (
                      <input
                        type="text"
                        value={goal.title}
                        onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                        className="text-lg font-semibold bg-white/20 border border-white/30 rounded px-2 py-1 text-white flex-1 mr-2"
                        autoFocus
                      />
                    ) : (
                      <h3 
                        className="text-lg font-semibold cursor-pointer hover:bg-white/5 rounded px-2 py-1 -m-2 transition-colors"
                        onClick={() => startEditingGoal(goal.id)}
                      >
                        {goal.title}
                      </h3>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goal.status === 'completed' ? 'bg-green-500/20 text-green-400 animate-pulse' :
                      goal.status === 'at_risk' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {goal.status === 'completed' ? '🎉 Completed!' : goal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <div className="flex items-center gap-2">
                        <span>Current:</span>
                        {editingGoal === goal.id ? (
                          <input
                            type="number"
                            value={goal.current}
                            onChange={(e) => updateGoal(goal.id, 'current', e.target.value)}
                            className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white w-20"
                          />
                        ) : (
                          <span className="cursor-pointer hover:bg-white/5 rounded px-1" onClick={() => startEditingGoal(goal.id)}>
                            {goal.current.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Target:</span>
                        {editingGoal === goal.id ? (
                          <input
                            type="number"
                            value={goal.target}
                            onChange={(e) => updateGoal(goal.id, 'target', e.target.value)}
                            className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white w-20"
                          />
                        ) : (
                          <span className="cursor-pointer hover:bg-white/5 rounded px-1" onClick={() => startEditingGoal(goal.id)}>
                            {goal.target.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          progress >= 100 ? 'bg-green-500 animate-pulse' : 
                          progress >= 75 ? 'bg-blue-500' : 
                          progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-white/60 mt-1">
                      {progress.toFixed(1)}% complete
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-white/60">
                      Deadline: {editingGoal === goal.id ? (
                        <input
                          type="date"
                          value={goal.deadline}
                          onChange={(e) => updateGoal(goal.id, 'deadline', e.target.value)}
                          className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white ml-2"
                        />
                      ) : (
                        <span className="cursor-pointer hover:bg-white/5 rounded px-1" onClick={() => startEditingGoal(goal.id)}>
                          {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      )}
                      {isOverdue && <span className="text-red-400 ml-2">(Overdue)</span>}
                    </div>
                    {editingGoal === goal.id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveGoal(goal.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingGoal(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team & Market Intelligence */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Management */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Team Overview</h3>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{member.name}</div>
                      <div className="text-white/60 text-sm">{member.role} • {member.department}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/60 text-xs">Since {new Date(member.startDate).toLocaleDateString()}</div>
                      <div className="text-green-400 text-xs">● Active</div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/80 text-sm">
                    <span className="font-medium">{businessMetrics.openPositions}</span> open positions
                  </div>
                </div>
              </div>
            </div>

            {/* Market Intelligence */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Market Intelligence</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white/80 font-medium mb-2">Recent Funding Rounds</h4>
                  <div className="space-y-2">
                    {marketData.recentFunding.map((funding, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-white">{funding.company}</span>
                        <span className="text-green-400 font-medium">
                          {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", notation: "compact" }).format(funding.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white/80 font-medium mb-2">Competitor Analysis</h4>
                  <div className="space-y-2">
                    {marketData.competitors.map((competitor, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-white">{competitor.name}</span>
                        <span className="text-blue-400">{competitor.marketShare}% market share</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tips */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
            <h2 className="text-xl font-semibold">Tips to Get More Funding</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside marker:text-primary-300">
              {tips.map((tip, idx) => (
                <li key={idx} className="text-white/85 leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          {/* Recent investor updates */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
            <h2 className="text-xl font-semibold">Recent Investor Updates</h2>
            <div className="mt-4 space-y-4">
              {investorUpdates.map(update => (
                <div key={update.id} className="rounded-xl bg-black/20 ring-1 ring-white/10 p-4">
                  <div className="text-white/60 text-xs uppercase tracking-wide">{update.date}</div>
                  <div className="mt-1 text-white leading-relaxed">{update.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Tracking Section */}
        <div className="mt-8">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Expense Tracking & Burn Rate</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {showAddForm ? 'Cancel' : '+ Add Expense'}
              </button>
            </div>

            {/* Burn Rate Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/20 rounded-xl p-4 ring-1 ring-white/10">
                <div className="text-white/60 text-sm">Total Spent</div>
                <div className="text-white font-bold text-lg">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(totalExpenses)}
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-4 ring-1 ring-white/10">
                <div className="text-white/60 text-sm">This Month</div>
                <div className="text-white font-bold text-lg">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(monthlyBurnRate)}
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-4 ring-1 ring-white/10">
                <div className="text-white/60 text-sm">Avg Burn Rate</div>
                <div className="text-white font-bold text-lg">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(avgBurnRate)}
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-4 ring-1 ring-white/10">
                <div className="text-white/60 text-sm">Runway</div>
                <div className={`font-bold text-lg ${runwayMonths < 6 ? 'text-red-400' : runwayMonths < 12 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {runwayMonths} months
                </div>
                <div className="text-white/60 text-xs">
                  {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(remainingFunds)} left
                </div>
              </div>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="mb-6 p-4 bg-black/20 rounded-xl ring-1 ring-white/10">
                <h3 className="text-lg font-medium mb-4">{editingId ? 'Edit Expense' : 'Add New Expense'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Amount (CAD)"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Operations">Operations</option>
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Legal">Legal</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={editingId ? updateExpense : addExpense}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {editingId ? 'Update' : 'Add'} Expense
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Expenses List */}
            <div className="space-y-3">
              {expenses.length === 0 ? (
                <div className="text-center py-8 text-white/60">
                  No expenses added yet. Click "Add Expense" to get started.
                </div>
              ) : (
                expenses.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl ring-1 ring-white/10 hover:bg-black/30 transition-colors">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-white font-medium">{expense.description}</div>
                        <div className="text-white/60 text-sm">{expense.category}</div>
                      </div>
                      <div className="text-white font-bold">
                        {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(expense.amount)}
                      </div>
                      <div className="text-white/80 text-sm">{expense.date}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editExpense(expense.id)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;