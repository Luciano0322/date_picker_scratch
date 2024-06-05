# Demo for Date Range picker from scratch

## Feature thinking:  

I use react day picker's examples as a reference. I think the question only need is date range feature so that I just focus on implement the date range selector.  

To consider about Nextjs environment, I choose TailwindCss as my styling method. There's optional from question for using the date format library, picking Date-fns library.  

## Reusability and extensibility

I would take start & end date as a porps to maintain reusability. At same time we could consider about styling extensibility. That question should be discuss with crew members. List how many optional actions shall we given to developer.  



## Structure  

/  
├── src/  
│   ├── components/  
│   │   ├── DateRangePicker  
│   │       ├── index.tsx  
│   │       ├── PickerHead.tsx  
│   │       ├── Calendar.tsx  
│   ├── utils/  
│   ├── App.js  
│   ├── index.js  
│   ├── index.css  
├── public/  
├── package.json  
├── tailwind.config.js  
├── postcss.config.js  
├── README.md  
└── ...  

