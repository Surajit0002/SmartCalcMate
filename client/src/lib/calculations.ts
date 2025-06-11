// EMI Calculation
export function calculateEMI(principal: number, rate: number, tenure: number) {
  const monthlyRate = rate / (12 * 100);
  const numPayments = tenure * 12;
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
              (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const totalAmount = emi * numPayments;
  const totalInterest = totalAmount - principal;
  
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest)
  };
}

// SIP Calculation
export function calculateSIP(monthlyInvestment: number, rate: number, tenure: number) {
  const monthlyRate = rate / (12 * 100);
  const numPayments = tenure * 12;
  
  const futureValue = monthlyInvestment * 
    (((Math.pow(1 + monthlyRate, numPayments)) - 1) / monthlyRate) * 
    (1 + monthlyRate);
    
  const totalInvestment = monthlyInvestment * numPayments;
  const totalGains = futureValue - totalInvestment;
  
  return {
    futureValue: Math.round(futureValue),
    totalInvestment: Math.round(totalInvestment),
    totalGains: Math.round(totalGains)
  };
}

// Compound Interest Calculation
export function calculateCompoundInterest(principal: number, rate: number, time: number, compound: number = 1) {
  const amount = principal * Math.pow(1 + (rate / (100 * compound)), compound * time);
  const interest = amount - principal;
  
  return {
    amount: Math.round(amount),
    interest: Math.round(interest)
  };
}

// BMI Calculation
export function calculateBMI(height: number, weight: number) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category = '';
  let color = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'blue';
  } else if (bmi < 25) {
    category = 'Normal Weight';
    color = 'green';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = 'yellow';
  } else {
    category = 'Obese';
    color = 'red';
  }
  
  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    color
  };
}

// BMR Calculation
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female') {
  let bmr: number;
  
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  
  return {
    bmr: Math.round(bmr),
    calories: {
      sedentary: Math.round(bmr * activityMultipliers.sedentary),
      light: Math.round(bmr * activityMultipliers.light),
      moderate: Math.round(bmr * activityMultipliers.moderate),
      active: Math.round(bmr * activityMultipliers.active),
      veryActive: Math.round(bmr * activityMultipliers.veryActive)
    }
  };
}

// Age Calculation
export function calculateAge(birthDate: Date, currentDate: Date = new Date()) {
  const years = currentDate.getFullYear() - birthDate.getFullYear();
  const months = currentDate.getMonth() - birthDate.getMonth();
  const days = currentDate.getDate() - birthDate.getDate();
  
  let adjustedYears = years;
  let adjustedMonths = months;
  let adjustedDays = days;
  
  if (adjustedDays < 0) {
    adjustedMonths--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    adjustedDays += lastMonth.getDate();
  }
  
  if (adjustedMonths < 0) {
    adjustedYears--;
    adjustedMonths += 12;
  }
  
  const totalDays = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  
  return {
    years: adjustedYears,
    months: adjustedMonths,
    days: adjustedDays,
    totalDays,
    totalHours,
    totalMinutes
  };
}

// Tip Calculation
export function calculateTip(billAmount: number, tipPercentage: number, peopleCount: number = 1) {
  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalBill = billAmount + tipAmount;
  const perPerson = totalBill / peopleCount;
  
  return {
    tipAmount: parseFloat(tipAmount.toFixed(2)),
    totalBill: parseFloat(totalBill.toFixed(2)),
    perPerson: parseFloat(perPerson.toFixed(2))
  };
}

// Percentage Calculations
export function calculatePercentage(type: string, value1: number, value2: number) {
  let result = 0;
  let formula = '';
  
  switch(type) {
    case 'basic':
      result = (value1 / 100) * value2;
      formula = `${value1}% of ${value2} = ${result}`;
      break;
    case 'of-what':
      result = (value1 / value2) * 100;
      formula = `${value1} is ${result.toFixed(2)}% of ${value2}`;
      break;
    case 'increase':
      result = value2 + ((value1 / 100) * value2);
      formula = `${value2} + ${value1}% = ${result}`;
      break;
    case 'decrease':
      result = value2 - ((value1 / 100) * value2);
      formula = `${value2} - ${value1}% = ${result}`;
      break;
  }
  
  return {
    result: parseFloat(result.toFixed(2)),
    formula
  };
}
