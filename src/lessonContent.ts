// src/lessonContent.ts
// Real card content for HomeBase lessons.
// Card types: 'hook' | 'learn' | 'apply' | 'win'
// Structure mirrors Hook → Anchor → Chunk(s) → Apply → Reinforce

export interface LessonCard {
  id: string
  type: 'hook' | 'learn' | 'apply' | 'win'
  title: string
  body: string
}

// Keyed by lesson ID matching content.ts format: p{pillarId}-m{moduleNum}-l{lessonNum}
export const lessonCards: Record<string, LessonCard[]> = {

  // ─────────────────────────────────────────
  // PILLAR 1 · MODULE 1 — Your First Paycheck Decoded
  // ─────────────────────────────────────────

  'p1-m1-l1': [
    {
      id: 'hook',
      type: 'hook',
      title: 'What Happened to My Money?',
      body: 'You worked 40 hours. You did the math — $15 × 40 = $600. Your check says $487.\n\nWhere did $113 go?',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'The System',
      body: 'Your paycheck doesn\'t come to you whole. Money is removed before it ever reaches your bank account — automatically, every single pay period.\n\nThis isn\'t a mistake. It\'s the system.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'What Are Deductions?',
      body: 'That missing money went to deductions. A deduction is any amount removed from your paycheck before you receive it.\n\nThere are two kinds: ones you\'re required to pay, and ones you chose.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Required Deductions',
      body: 'Required deductions = taxes.\n\nThe federal government takes a cut. Your state government takes a cut (in most states). A program called FICA takes a cut.\n\nYou can\'t opt out of these. They come out first.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Voluntary Deductions',
      body: 'Voluntary deductions = things you signed up for.\n\nHealth insurance. A retirement savings account. A health savings account.\n\nThese only come out if you enrolled — but once you did, they come out before you see the money.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Try It Now',
      body: 'Pull up your pay stub — paper or digital.\n\nFind the section labeled "Deductions."\n\nEvery line in that list is a reason your check is smaller than you expected.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Gross Pay vs. Net Pay',
      body: 'The gap between what you earned and what you received has a name.\n\nWhat you earned = gross pay.\nWhat you received = net pay.\n\nThat gap is your deductions — and now you know what\'s in it.',
    },
  ],

  'p1-m1-l2': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Gross Pay vs. Net Pay',
      body: 'Two numbers define every paycheck.\n\nOne is what you earned.\nOne is what you keep.\n\nMost people only look at the second one.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'Gross Pay',
      body: 'Gross pay = the total amount you earned before anything is taken out.\n\nIt\'s your hours × your wage. Or your annual salary ÷ your pay periods.\n\nIt\'s the starting number — before the government gets involved.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Net Pay',
      body: 'Net pay = what you actually receive.\n\nIt\'s what hits your bank account. Some people call it "take-home pay" — because that\'s literally what you take home.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'The Gap',
      body: 'The gap between gross and net = your deductions.\n\nSome are taxes. Some are benefits you enrolled in.\n\nAll of them reduce what you see on your check.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Real Example',
      body: 'Gross pay: $800\nFederal income tax: −$72\nState income tax: −$32\nFICA: −$61\nHealth insurance: −$45\n\nNet pay: $590\n\nThat\'s $210 in deductions — real money with real destinations.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Find Your Numbers',
      body: 'Look at your pay stub.\n\nFind "Gross Pay" near the top. Find "Net Pay" near the bottom.\n\nThe difference between them is your total deductions. Does the math match what you expected?',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Your Real Number',
      body: 'If you budget using gross pay, you\'ll always come up short.\n\nYour entire financial life runs on net pay.\n\nThat\'s your real number. Build everything on that.',
    },
  ],

  'p1-m1-l3': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Federal & State Taxes',
      body: 'The federal government takes money out of every paycheck you earn. So does your state — in most cases.\n\nHere\'s exactly what they\'re taking and why.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'Federal Income Tax',
      body: 'Federal income tax = money paid to the U.S. government.\n\nIt funds national programs — defense, infrastructure, federal agencies, and more.\n\nThe amount you pay depends on how much you earn.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Progressive Tax System',
      body: 'The U.S. uses a progressive tax system. The more you earn, the higher your tax rate — but only on the dollars above each threshold.\n\nYou\'re not taxed the same rate on every dollar you earn.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Tax Brackets',
      body: '2024 brackets (single filer):\n\n10% → first ~$11,600\n12% → $11,601–$47,150\n22% → $47,151–$100,525\n\nOnly the dollars in each bracket are taxed at that rate.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'State Income Tax',
      body: 'State income tax varies by where you live.\n\nNo state tax: Florida, Texas, Nevada, Washington, and others.\n\nSome use flat rates. Some use brackets.\n\nIf your state has no income tax, that line on your stub will be blank.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'How It\'s Withheld',
      body: 'Your employer withholds these taxes automatically, based on your W-4 form.\n\nAt year-end, you file a return to settle up. Too much withheld = refund. Too little = you owe.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Find Your Lines',
      body: 'Find "Federal Income Tax" and "State Income Tax" on your pay stub.\n\nIf you live in a no-income-tax state, the state line may be blank or missing entirely.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Brackets, Not Rates',
      body: 'You\'re not taxed at your highest rate on every dollar.\n\nYou\'re taxed in brackets — progressively — and only the dollars above each threshold hit the higher rate.\n\nEarning more is always worth it.',
    },
  ],

  'p1-m1-l4': [
    {
      id: 'hook',
      type: 'hook',
      title: 'FICA — Social Security & Medicare',
      body: 'There\'s a line on your pay stub that says FICA — or "Social Security" and "Medicare."\n\nMost people have no idea what it is.\n\nIt\'s not income tax. And you can\'t opt out.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'What FICA Is',
      body: 'FICA stands for the Federal Insurance Contributions Act.\n\nIt funds two programs: Social Security and Medicare.\n\nBoth you and your employer pay into these — every pay period.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Social Security Tax',
      body: 'Social Security tax = 6.2% of your gross wages.\n\nThis funds retirement benefits, disability benefits, and survivor benefits.\n\nThe money you pay now may come back to you — or your family — later in life.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Medicare Tax',
      body: 'Medicare tax = 1.45% of your gross wages.\n\nThis funds health insurance for people 65 and older, and some people with disabilities.\n\nThere\'s no income cap on Medicare — you pay it on every dollar you earn.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Your Employer Matches',
      body: 'You pay 6.2% + 1.45% = 7.65%.\n\nYour employer pays another 7.65% on top of that.\n\nThe total FICA contribution on your wages is 15.3% — split evenly between you and your employer.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'The Income Cap',
      body: 'Social Security has a cap.\n\nIn 2024, you only pay it on the first $168,600 you earn in a year. Earn above that, and Social Security stops being deducted for the rest of the year.\n\nMedicare has no cap.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Verify Yours',
      body: 'Find "Social Security" (or "OASDI") and "Medicare" on your pay stub.\n\nYour contributions should be 6.2% and 1.45% of your gross wages.\n\nRun the math to verify — it should be exact.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'A Contribution, Not a Penalty',
      body: 'FICA isn\'t a penalty. It\'s a contribution.\n\nSocial Security and Medicare exist because workers fund them — including you.\n\nNow you know exactly what you\'re paying and where every dollar goes.',
    },
  ],

  'p1-m1-l5': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Voluntary Deductions',
      body: 'Some deductions come out because the law requires them.\n\nOthers come out because you said yes when you were hired.\n\nThese can work hard for you if you understand them.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'What Voluntary Means',
      body: 'Voluntary deductions = amounts you agreed to have taken from your paycheck.\n\nThey reduce your net pay — but they provide something valuable in return.\n\nThe most common: health insurance, retirement contributions, and HSAs.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Health Insurance',
      body: 'If your employer offers health coverage and you enrolled, your share of the monthly premium comes out of each paycheck.\n\nYour employer usually covers a large portion — sometimes 70% or more. You pay the rest.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: '401(k) Contributions',
      body: 'A 401(k) is a retirement savings account through your employer.\n\nWhen you contribute, the money comes out pre-tax — it\'s removed before taxable income is calculated.\n\nThat lowers what you owe in federal and state taxes right now.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Employer 401(k) Match',
      body: 'Many employers match your contributions up to a percentage of your salary.\n\nExample: 100% match on up to 3% of salary.\n\nIf you contribute 3% and your employer matches — your account gets 6%, but you only gave 3%. That\'s free money.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'HSA — Health Savings Account',
      body: 'Available if you\'re enrolled in a qualifying high-deductible health plan.\n\nContributions go in pre-tax, grow tax-free, and come out tax-free for medical expenses.\n\nUnused funds roll over every year — it\'s not use-it-or-lose-it.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Know What You Have',
      body: 'Look at your pay stub. Can you identify your voluntary deductions?\n\nHealth insurance? 401(k)? HSA?\n\nIf you\'re unsure what you signed up for, check your new hire paperwork or your company\'s HR portal.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Decisions, Not Expenses',
      body: 'Voluntary deductions aren\'t just expenses — they\'re decisions.\n\nHealth coverage, retirement savings, and tax-advantaged accounts are worth understanding fully.\n\nThe more you know, the better you can use them.',
    },
  ],

  'p1-m1-l6': [
    {
      id: 'hook',
      type: 'hook',
      title: 'How to Read Your Pay Stub',
      body: 'Your pay stub tells you everything about where your money went.\n\nMost people never read it.\n\nAfter this page, you will — and every line will make sense.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'What a Pay Stub Is',
      body: 'A pay stub is a detailed record of your earnings and deductions for one pay period.\n\nIt breaks down every dollar — what you earned, what was removed, and what you received.\n\nRead it every time you get paid. Keep them. They\'re financial records.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Earnings Section',
      body: 'Usually at the top. Shows gross pay: hours worked, your rate, and any overtime.\n\nAlso shows year-to-date (YTD) totals — everything earned since January 1st.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Tax Deductions',
      body: 'Listed individually:\n\nFederal income tax. State income tax. Social Security. Medicare.\n\nEach has its own line — amount for this period and a YTD running total.\n\nThese are non-negotiable. They appear on every check.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Voluntary Deductions',
      body: 'Below the taxes: health insurance, 401(k), HSA, and anything else you enrolled in.\n\nSome stubs show your employer\'s matching contributions here too.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'Net Pay',
      body: 'At the bottom. This is the amount deposited into your account.\n\nGross pay minus every deduction above it.\n\nIt should match what your bank shows.',
    },
    {
      id: 'chunk-5',
      type: 'learn',
      title: 'The YTD Column',
      body: 'Runs alongside each line. Shows the cumulative total since January 1st.\n\nEssential for verifying your W-2 at tax time — every number should match.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Walk Through It',
      body: 'Pull up your pay stub right now.\n\nFind: gross pay, federal tax, state tax, Social Security, Medicare, net pay.\n\nIf a line is unfamiliar, note it. Every one will make sense by the end of this module.',
    },
    {
      id: 'win',
      type: 'win',
      title: '90 Seconds Per Paycheck',
      body: 'Your pay stub is a document. A record. A financial tool.\n\nIt tells you exactly what happened to your money — no guessing required.\n\n90 seconds every pay period. That\'s all it takes to stay informed about your own money.',
    },
  ],

  'p1-m1-l7': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Hourly vs. Salary',
      body: 'When you get a job, you\'ll usually be paid one of two ways: hourly or salary.\n\nThey\'re not the same — and which one you have affects more than just your paycheck.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'Hourly Pay',
      body: 'Hourly pay = you\'re paid for every hour you work.\n\nWork more, earn more. Work fewer, earn less.\n\nYour paycheck varies based on hours logged each period.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Overtime',
      body: 'Federal law requires most hourly employees to receive 1.5x their rate for hours over 40 in a workweek.\n\n45 hours at $15/hr:\nRegular: 40 × $15 = $600\nOvertime: 5 × $22.50 = $112.50\nTotal gross: $712.50',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Salary Pay',
      body: 'Salary = a fixed annual amount, divided into regular pay periods.\n\nWork 40 hours or 50 hours — your paycheck is the same.\n\nLess direct link between effort and pay, but consistent and predictable.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Calculating Gross Pay',
      body: 'Hourly → hours worked × rate = gross for the period\n\nSalary → annual salary ÷ number of pay periods\n\nExample: $40,000/yr ÷ 26 biweekly periods = $1,538.46 gross per check',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'Exempt vs. Non-Exempt',
      body: 'Non-exempt employees are covered by overtime laws — most hourly workers.\n\nExempt employees are not — most (but not all) salaried workers.\n\nYour classification determines whether extra hours earn extra pay.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Which Are You?',
      body: 'Check your offer letter or your pay stub.\n\nIs there an hourly rate listed, or an annual salary?\n\nIf hourly, verify your hours × rate matches your gross pay. If salaried, use the formula to confirm.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Know Your Structure',
      body: 'Neither pay structure is automatically better.\n\nHourly workers can out-earn salaried workers during busy seasons. Salaried workers have predictability.\n\nWhat matters is understanding what you have — and knowing you\'re being paid correctly.',
    },
  ],

  'p1-m1-l8': [
    {
      id: 'hook',
      type: 'hook',
      title: 'What to Do the Day You Get Paid',
      body: 'Pay day feels good for about 30 minutes.\n\nThen the bills pull at it. An impulse buy happens. A friend needs help.\n\nSomehow, two weeks later, you\'re uneasy again. This page breaks that cycle.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'Act, Don\'t React',
      body: 'Having a plan for your money the day it arrives is one of the highest-leverage financial habits you can build.\n\nMost people react to their paycheck.\n\nYou\'re going to act on it.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Step 1: Confirm the Deposit',
      body: 'Before anything else — verify the money is in your account and the amount looks right.\n\nCross-reference with your pay stub. Payroll errors happen. Catching one early is much easier than fixing it after you\'ve spent the money.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Step 2: Pay What\'s Due',
      body: 'Identify every bill due before your next paycheck.\n\nPay those first — rent, utilities, minimum debt payments — before any discretionary spending.\n\nBills first is non-negotiable.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Step 3: Move Money to Savings',
      body: 'Even a small amount. Even $25.\n\nTransfer it the same day the paycheck arrives.\n\nIf it doesn\'t land in checking, you won\'t spend it. That\'s the mechanism.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'Step 4: Know Your Number',
      body: 'After bills and savings — what\'s left in checking?\n\nThat\'s your number. That\'s what you have until the next paycheck.\n\nKnowing this prevents overdrafts, surprises, and end-of-period panic.',
    },
    {
      id: 'chunk-5',
      type: 'learn',
      title: 'Step 5: 5-Minute Review',
      body: 'Scan your pay stub. Glance at upcoming bills. Check your bank balance.\n\nLook for anything off — unexpected charges, wrong deductions, missing deposits.\n\nFive minutes now prevents hours of fixing later.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Run All Five Steps',
      body: 'Next pay day — before you spend a single dollar — run all five steps.\n\nConfirm. Pay. Save. Know your number. Review.\n\nIt takes 15 minutes. It changes how your entire pay period goes.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'A Starting Line, Not a Finish Line',
      body: 'Pay day isn\'t a reward for surviving the last two weeks. It\'s a resource for the next two weeks.\n\nThe first 15 minutes after your paycheck arrives determine how the next two weeks go.\n\nBuild this habit now. It compounds every single pay period.',
    },
  ],

  // ─────────────────────────────────────────
  // PILLAR 1 · MODULE 2 — Taxes Without the Panic
  // ─────────────────────────────────────────

  'p1-m2-l1': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Why We Pay Taxes',
      body: 'Every paycheck, money disappears before you see it.\n\nEvery April, people panic.\n\nNobody explains why any of it exists. This page does.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'What Taxes Are',
      body: 'Taxes are mandatory contributions to fund the systems that keep society running.\n\nThey\'re not optional. They\'re not punishment.\n\nThey\'re the price of living in a country with infrastructure, safety nets, and public services.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Federal Taxes',
      body: 'Federal taxes fund national programs.\n\nMilitary and national defense. Federal highways and bridges. Social Security and Medicare. Federal courts and law enforcement. National parks. Scientific research.\n\nEvery dollar has a destination.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'State & Local Taxes',
      body: 'State and local taxes fund what\'s closer to home.\n\nPublic schools. State roads. Police and fire departments. State parks. Local government services.\n\nThe roads you drive on, the schools in your neighborhood — funded by state and local taxes.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Safety Nets',
      body: 'Taxes also fund safety nets.\n\nUnemployment insurance. Medicaid. SNAP (food assistance). Housing assistance.\n\nThese are programs that exist specifically for people going through hard times — funded by the taxes everyone pays.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Look Around You',
      body: 'Think about something you used today that you didn\'t pay for directly.\n\nA road. A sidewalk. A public school. A library. A fire department.\n\nTaxes paid for it.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'A Shared System',
      body: 'You can disagree with how tax money is spent. That\'s a legitimate conversation.\n\nBut taxes themselves aren\'t the enemy — they\'re a shared system.\n\nUnderstanding them is the first step to navigating them.',
    },
  ],

  'p1-m2-l2': [
    {
      id: 'hook',
      type: 'hook',
      title: 'W-2 vs. 1099',
      body: 'At the end of every year, you\'ll receive a tax form.\n\nWhich form you get changes everything about how you file — and how much you might owe.\n\nTwo forms. Two very different situations.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'The Two Forms',
      body: 'If you work a traditional job with an employer, you get a W-2.\n\nIf you freelance, do gig work, or work as an independent contractor, you get a 1099.\n\nThe difference isn\'t just paperwork — it affects how taxes are withheld and what you owe.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'W-2 Employees',
      body: 'Your employer withholds taxes from every paycheck — federal, state, FICA.\n\nYou don\'t have to calculate or pay taxes yourself throughout the year.\n\nAt year-end, your employer sends you a W-2 summarizing everything withheld.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: '1099 Workers',
      body: 'Nobody withholds taxes from your payments.\n\nYou receive the full amount — but you owe taxes on it.\n\nAnd you\'re responsible for calculating and paying them yourself.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'The 1099 Tax Hit',
      body: 'As a 1099 worker, you pay both sides of FICA — the employee portion AND the employer portion.\n\nThat\'s 15.3% in self-employment tax on top of income tax.\n\nThis surprises a lot of people the first time they file.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'Can You Be Both?',
      body: 'Yes. Many people have a W-2 job and do freelance work on the side.\n\nYou\'ll receive both forms and report income from both.\n\nYour taxes get more complex — but manageable with the right approach.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Know Your Form',
      body: 'Do you know which form you\'ll receive this year?\n\nAre you on payroll with taxes withheld? W-2.\n\nAre you paid directly with no withholding? Expect a 1099.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Know What You\'re Responsible For',
      body: 'Your tax form doesn\'t just tell you what happened last year.\n\nIt tells you how your taxes work and what you\'re responsible for.\n\nKnow which one you are — it changes your entire approach to filing.',
    },
  ],

  'p1-m2-l3': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Independent vs. Dependent',
      body: 'When you file taxes, one of the first questions is whether someone can claim you as a dependent.\n\nIt sounds simple.\n\nIt\'s not — and getting it wrong affects both your return and someone else\'s.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'What a Dependent Is',
      body: 'A dependent is someone who relies on another person for financial support.\n\nIf you qualify as someone else\'s dependent, they can claim tax benefits for supporting you.\n\nOnly one person can claim you. You cannot both claim you.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Qualifying Child Test',
      body: 'To be claimed as a dependent child, you generally must:\n\n• Be under 19 (or under 24 if a full-time student)\n• Live with the person claiming you for more than half the year\n• Not provide more than half of your own financial support',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Qualifying Relative Test',
      body: 'If you don\'t meet the child criteria, you may still be a qualifying relative.\n\nYou must earn less than ~$5,050 in gross income (2024).\n\nThe person claiming you must provide more than half your support.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'What It Means for You',
      body: 'If someone claims you as a dependent, your standard deduction is limited.\n\nInstead of the full $14,600, it\'s capped at your earned income + $450.\n\nThis typically means more taxable income than filing fully independently.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'The Conflict Zone',
      body: 'What if your parents claim you without asking — and you already filed independently?\n\nThe IRS flags the duplicate Social Security number.\n\nThe return filed first typically processes; the second triggers a review.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Answer This Honestly',
      body: 'Before you file — did someone else provide more than half of your financial support this year?\n\nIf yes, talk to that person before you file. Figure out who\'s claiming what.\n\nFiling in conflict creates IRS problems for both of you.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Support, Not Age',
      body: 'Dependent status isn\'t about age or whether you live alone.\n\nIt\'s about who financially supported whom — and by how much.\n\nKnow your status before you file. It shapes your entire return.',
    },
  ],

  'p1-m2-l4': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Tax Brackets Explained',
      body: '"If I earn more, I\'ll move into a higher tax bracket and take home less."\n\nThis is one of the most common money myths in existence.\n\nIt\'s also completely wrong.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'How Brackets Work',
      body: 'The U.S. uses a progressive tax system.\n\nYour income is divided into ranges — called brackets. Each range is taxed at its own rate.\n\nOnly the dollars inside each range get taxed at that rate.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: '2024 Brackets — Single Filer',
      body: '10% → $0 to $11,600\n12% → $11,601 to $47,150\n22% → $47,151 to $100,525\n24% → $100,526 to $191,950\n\nHigher brackets apply above that.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Real Example — $50,000 Income',
      body: 'First $11,600 → 10% = $1,160\nNext $35,550 → 12% = $4,266\nRemaining $2,850 → 22% = $627\n\nTotal tax: ~$6,053\nEffective rate: about 12.1% — not 22%.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Marginal vs. Effective Rate',
      body: 'Marginal rate = the rate on your highest dollar (your "bracket").\n\nEffective rate = the average rate across all your income.\n\nWhen someone says "I\'m in the 22% bracket," their effective rate is lower than 22%.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'Earning More Is Always Worth It',
      body: 'Some people avoid raises to "stay in a lower bracket."\n\nThis is unnecessary. Moving into a higher bracket only raises the rate on the dollars above the threshold.\n\nYour income below the threshold is taxed exactly the same as before.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Estimate Your Bracket',
      body: 'Take your gross annual income. Subtract your standard deduction (~$14,600 single filer, 2024).\n\nThat\'s roughly your taxable income.\n\nFind where it lands in the bracket chart above.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Your Bracket Is a Label',
      body: 'Your tax bracket is just a label for your highest-taxed dollar.\n\nIt doesn\'t define what you actually pay.\n\nYour effective rate — the real number — is almost always lower.',
    },
  ],

  'p1-m2-l5': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Deductions & Credits',
      body: 'The tax code isn\'t just about what you owe.\n\nIt\'s full of legal ways to pay less.\n\nTwo tools do most of the work: deductions and credits.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'The Difference',
      body: 'A deduction reduces the amount of income you\'re taxed on.\n\nA credit directly reduces the amount of tax you owe.\n\nCredits are dollar-for-dollar reductions. They\'re more powerful than deductions.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'The Standard Deduction',
      body: 'Most people don\'t itemize — they take the standard deduction.\n\n2024: $14,600 (single) · $29,200 (married filing jointly)\n\nThis amount is automatically subtracted from your gross income before taxes are calculated.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Above-the-Line Deductions',
      body: 'Available regardless of whether you itemize.\n\nStudent loan interest (up to $2,500). Traditional IRA contributions. HSA contributions. Self-employed health insurance.\n\nThese reduce your adjusted gross income before the standard deduction is applied.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Credits — The Powerful Tool',
      body: 'A $1,000 deduction saves you $120 if you\'re in the 12% bracket.\n\nA $1,000 credit saves you exactly $1,000 — regardless of your bracket.\n\nCommon credits: Earned Income Tax Credit, Child Tax Credit, American Opportunity Credit.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'Refundable vs. Non-Refundable',
      body: 'Non-refundable credits reduce your tax bill to zero — but no further.\n\nRefundable credits can reduce your bill below zero — you get money back even if you owed nothing.\n\nThe Earned Income Tax Credit is refundable.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Two Things to Look Up',
      body: 'This tax season:\n\n1. Does your situation qualify you for the Earned Income Tax Credit?\n\n2. Are you contributing to an HSA or IRA? Those are above-the-line deductions you may already have.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Use the Tools',
      body: 'The goal of tax planning isn\'t to cheat the system.\n\nIt\'s to use every legal tool available to you.\n\nDeductions and credits are those tools — and they exist specifically to be used.',
    },
  ],

  'p1-m2-l6': [
    {
      id: 'hook',
      type: 'hook',
      title: 'How to File Your Taxes',
      body: 'Every year, millions of people put off filing their taxes until the last minute — or miss the deadline entirely.\n\nIt doesn\'t have to be that hard.\n\nHere\'s the full process, step by step.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'What Filing Means',
      body: 'Filing your taxes = reporting your income to the government and settling up.\n\nIf taxes were withheld from your paychecks, you\'re reconciling what was withheld vs. what you actually owed.\n\nMost people in straightforward situations can file for free in under an hour.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Step 1: Gather Documents',
      body: 'W-2 (from your employer) or 1099 (from clients/platforms) — one per income source.\n\nAny other income records. Social Security number. Bank account info for direct deposit.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Step 2: Choose How to File',
      body: 'IRS Free File — free for most people (income under ~$79,000).\n\nTax software — TurboTax, H&R Block, TaxAct. Usually $0–$60 for simple returns.\n\nVITA — free in-person help for qualifying individuals.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Step 3: Enter & Review',
      body: 'Enter your income, deductions, and credits. Tax software walks you through with questions.\n\nBefore submitting: verify your Social Security number, bank account number, and income totals.\n\nErrors on these delay refunds.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'Step 4: After You File',
      body: 'Refund by direct deposit: typically 10–21 days after IRS acceptance.\n\nIf you owe: payment is due by the filing deadline even if you filed an extension.\n\nTrack your refund at irs.gov/refunds.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Get Ahead Now',
      body: 'Make a folder — physical or digital — and drop in every tax document as it arrives.\n\nW-2s and 1099s are typically sent by January 31st.\n\nHaving everything in one place makes the process take 30 minutes, not 3 hours.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'A Process, Not an Event',
      body: 'Filing taxes is a process, not an event.\n\nThe people who dread it most are the people who do it unprepared.\n\nA little organization, a free tool, and an hour of your time — that\'s all it takes.',
    },
  ],

  'p1-m2-l7': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Filing an Amendment',
      body: 'You filed your taxes. Then you found a mistake.\n\nA missing 1099. A deduction you forgot. A filing status error.\n\nThe good news: you can fix it. The form is called a 1040-X.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'What an Amended Return Is',
      body: 'Form 1040-X lets you correct a previously filed tax return.\n\nYou can amend to fix errors, add missing income, claim missed deductions or credits, or change your filing status.\n\nIt\'s a normal part of the tax system — not a red flag.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Common Reasons to Amend',
      body: '• You received a late W-2 or 1099 after you filed\n• You forgot to claim a deduction or credit\n• You filed with the wrong filing status\n• You incorrectly reported dependents\n\nNote: the IRS corrects math errors automatically — no amendment needed for those.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'The Deadline',
      body: 'You have 3 years from the original filing deadline to amend and claim a refund.\n\nExample: a 2023 return (due April 15, 2024) can be amended for a refund until April 15, 2027.\n\nAfter 3 years, you can still amend — but you can\'t receive money back.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'How to File a 1040-X',
      body: 'Download Form 1040-X from irs.gov.\n\nColumn A: original figures. Column C: corrected figures. Column B: the difference.\n\nAttach any new or corrected forms. E-filing is available for many returns through tax software.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'How Long It Takes',
      body: 'E-filed 1040-X: typically 3 weeks to process.\nPaper-filed 1040-X: up to 20 weeks.\n\nTrack status at irs.gov/filing/amended-return-status.\n\nDo not file a second amendment while the first is still processing.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Think Back',
      body: 'Think back to your last return.\n\nDid you receive any tax documents after you filed? Did you forget any income or deductions?\n\nIf something was wrong — even if small — it\'s worth fixing.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Find It. Fix It.',
      body: 'Mistakes on tax returns happen. They\'re fixable.\n\nThe IRS has a process designed for exactly this — and using it is always better than leaving an error uncorrected.\n\nFind it. Fix it. File the 1040-X.',
    },
  ],

  'p1-m2-l8': [
    {
      id: 'hook',
      type: 'hook',
      title: 'What Happens If You Don\'t File',
      body: 'Every year, millions of people don\'t file their taxes.\n\nSome don\'t know they have to. Some can\'t afford to deal with it. Some are scared.\n\nHere\'s what actually happens — and why it\'s almost always worse than filing.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'The IRS Already Knows',
      body: 'Not filing doesn\'t make the obligation go away.\n\nThe IRS knows what you earned — your employers report your wages.\n\nIf you don\'t file, the IRS can file for you — and they won\'t give you any deductions or credits.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Failure-to-File Penalty',
      body: '5% of your unpaid taxes per month you don\'t file, up to 25%.\n\nStarts the day after the deadline.\n\nOwe $1,000 and wait 5 months? You owe $1,250 — before interest.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Failure-to-Pay Penalty',
      body: '0.5% of unpaid taxes per month.\n\nSmaller than failure-to-file — which is why you should always file on time, even if you can\'t pay.\n\nFiling without paying is still much better than not filing at all.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'What the IRS Can Do',
      body: 'Levy your bank account. Garnish your wages. Place liens on your property. Withhold future refunds.\n\nThe IRS has significant legal authority to collect — and they use it.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'If You\'re Owed a Refund',
      body: 'If the IRS owes you money, there\'s no penalty for filing late.\n\nYou have 3 years from the original due date to claim a refund.\n\nAfter 3 years, the refund is forfeited — the government keeps it.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'If You\'re Behind',
      body: 'Behind on filing? Don\'t wait.\n\nFile your missing returns as soon as possible — even years-old ones.\n\nThe sooner you file, the sooner penalties stop accumulating. The IRS has payment plans for people who can\'t pay in full.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'File. Always.',
      body: 'The longer you avoid filing, the worse it gets — financially and emotionally.\n\nFiling a late return — even years late — is almost always better than continuing to not file.\n\nFile. Always.',
    },
  ],

  'p1-m2-l9': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Refund vs. Owing Money',
      body: 'Some people get a refund in April. Some people get a bill.\n\nMost people don\'t know why they ended up with one or the other.\n\nHere\'s exactly what\'s happening.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'It\'s a Reconciliation',
      body: 'Your tax refund isn\'t a bonus. Your tax bill isn\'t a punishment.\n\nBoth are the result of reconciliation — comparing what was withheld from your paychecks to what you actually owed.\n\nThe outcome depends on how accurate your withholding was.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Refund = Over-Withheld',
      body: 'Refund = too much was withheld throughout the year.\n\nThe government held more than you owed — now they\'re returning the difference.\n\nIt feels like a windfall, but it was your money the whole time. You gave the government an interest-free loan.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'Owing = Under-Withheld',
      body: 'Owing money = too little was withheld throughout the year.\n\nYour paychecks were larger because less was taken out — but the tab comes due in April.\n\nThis isn\'t a penalty. It\'s just settling up.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'Your W-4 Controls This',
      body: 'The primary driver is your W-4 form — filled out when you started your job.\n\nA major life change (new job, marriage, child, side income) can throw off your withholding significantly.\n\nYou can update your W-4 at any time.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'If You Owe and Can\'t Pay',
      body: 'File on time regardless — this avoids the larger failure-to-file penalty.\n\nPay as much as you can by the deadline.\n\nSet up an IRS installment agreement for the rest.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Adjust Your Withholding',
      body: 'After you file this year — look at the outcome.\n\nBig refund? Consider adjusting your W-4 to keep more money in your paycheck throughout the year.\n\nOwed a lot? You may need to withhold more.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Aim for Accuracy',
      body: 'Refund or balance due — neither is inherently good or bad.\n\nWhat matters is understanding why it happened and whether your withholding is working for your life.\n\nYou can adjust it. That\'s the point.',
    },
  ],

  'p1-m2-l10': [
    {
      id: 'hook',
      type: 'hook',
      title: 'Quarterly Taxes',
      body: 'If you\'re self-employed or freelancing — even on the side — the tax system works differently for you.\n\nThere\'s no employer withholding anything.\n\nYou\'re responsible for paying taxes throughout the year — not just in April.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'The Quarterly System',
      body: 'The IRS requires people who expect to owe $1,000 or more in taxes to pay quarterly estimated taxes.\n\nFour payments per year, spread across the calendar.\n\nMiss them and you\'ll pay penalties — even if you pay everything in full when you file.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'The Four Due Dates',
      body: 'Q1: April 15\nQ2: June 15\nQ3: September 15\nQ4: January 15 (of the following year)\n\nThese are payment deadlines — separate from your annual return filing date.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'How Much to Pay',
      body: 'Simplest method: pay 25% of your estimated annual tax liability each quarter.\n\nSafe harbor rule: pay at least 100% of what you owed last year (110% if you earned over $150,000) — no penalties even if you owe more at filing.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'How to Pay',
      body: 'IRS Direct Pay at irs.gov/payments — free, direct from your bank account.\n\nEFTPS — for larger or recurring payments.\n\nCheck mailed with Form 1040-ES.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'The Savings Rule',
      body: 'Set aside 25–30% of every payment you receive — immediately, before you spend it.\n\nMove it to a separate savings account.\n\nThat\'s your tax fund. Touch it only for quarterly payments.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Add the Dates',
      body: 'If you have any self-employment income this year — add the four quarterly due dates to your calendar now.\n\nEven if you\'re not sure exactly how much you\'ll owe, paying something each quarter is better than nothing.',
    },
    {
      id: 'win',
      type: 'win',
      title: 'Same Taxes, Different Schedule',
      body: 'Quarterly taxes aren\'t extra taxes — they\'re the same taxes, paid on a schedule.\n\nThe system is designed for people whose income isn\'t automatically withheld.\n\nStay ahead of it, and April will never feel like a crisis.',
    },
  ],

  'p1-m2-l11': [
    {
      id: 'hook',
      type: 'hook',
      title: 'What April 15 Actually Means',
      body: 'April 15. Everyone dreads it. Few people know exactly what it is.\n\nIt\'s not just "tax day."\n\nIt\'s a deadline with specific rules — and knowing them makes it much less scary.',
    },
    {
      id: 'anchor',
      type: 'learn',
      title: 'The Federal Deadline',
      body: 'April 15 is the federal tax filing and payment deadline.\n\nBy this date: your return must be filed, and any taxes you owe must be paid.\n\nWhen it falls on a weekend or holiday, it shifts to the next business day.',
    },
    {
      id: 'chunk-1',
      type: 'learn',
      title: 'Filing an Extension',
      body: 'Can\'t finish your return by April 15? File Form 4868 for an automatic 6-month extension.\n\nNew deadline: October 15.\n\nImportant: extension = more time to file. Not more time to pay. Taxes owed are still due April 15.',
    },
    {
      id: 'chunk-2',
      type: 'learn',
      title: 'State Deadlines',
      body: 'Most states follow the federal April 15 deadline.\n\nSome differ. A few states have no income tax and no deadline.\n\nCheck your specific state — don\'t assume.',
    },
    {
      id: 'chunk-3',
      type: 'learn',
      title: 'The IRA & HSA Deadline',
      body: 'April 15 is also an investment deadline.\n\nYou can contribute to a traditional IRA or Roth IRA for the prior tax year up until April 15.\n\nSame for HSA contributions. Miss this and the prior-year window closes permanently.',
    },
    {
      id: 'chunk-4',
      type: 'learn',
      title: 'The Quarterly Overlap',
      body: 'Q1 estimated taxes for self-employed individuals are also due April 15.\n\nSame date as the annual filing deadline — easy to miss if you\'re not tracking both.\n\nOne date. Multiple obligations. Know all of them.',
    },
    {
      id: 'apply',
      type: 'apply',
      title: 'Put It on Your Calendar',
      body: 'Put April 15 on your calendar — every year, permanently.\n\nNote it as three things:\n1. File return\n2. Pay any balance\n3. Last chance for prior-year IRA/HSA contributions',
    },
    {
      id: 'win',
      type: 'win',
      title: 'A Date, Not a Crisis',
      body: 'April 15 is a fixed point in your financial year — every year for the rest of your working life.\n\nThe people who handle it calmly are the ones who prepared in advance.\n\nIt\'s a date, not a crisis.',
    },
  ],

}
