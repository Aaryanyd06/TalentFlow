"use client";

import React, { useState, ReactElement } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  PieProps,
} from "recharts";

const COLORS = [
  "#003F5C",
  "#58508D",
  "#BC5090",
  "#FF6361",
  "#FFA600",
];

const data = [
  { name: "Applied", value: 400 },
  { name: "Screening", value: 300 },
  { name: "Interview", value: 200 },
  { name: "Offer", value: 50 },
  { name: "Hired", value: 25 },
];

const RADIAN = Math.PI / 180;

function getContrastTextColor(hex: string) {
  const raw = hex.replace("#", "");
  const r = parseInt(raw.substring(0, 2), 16);
  const g = parseInt(raw.substring(2, 4), 16);
  const b = parseInt(raw.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#111827" : "#ffffff";
}

const renderCustomizedLabel: PieProps["label"] = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props as any;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const fill = getContrastTextColor(COLORS[index % COLORS.length]);

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};


const renderActiveShape = (props: any): ReactElement => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-12} textAnchor="middle" fill="#4A90E2" className="text-lg font-bold" style={{ fontSize: 14 }}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" fill="#4A90E2" style={{ fontSize: 13 }}>
        {value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="none"
        style={{
          transition: "all 0.45s cubic-bezier(.2,.8,.2,1)",
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.36))",
        }}
      />
    </g>
  );
};

interface CustomPieProps extends PieProps {
  activeIndex?: number;
  activeShape?: (props: any) => ReactElement;
}

function CustomPie(props: CustomPieProps) {
  return <Pie {...props} />;
}

export default function PipelineChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-card p-6 rounded-lg h-[400px] flex flex-col">
      <h3 className="text-xl font-bold tracking-tight mb-4 ml-[115px]">Candidate Pipeline</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <CustomPie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              paddingAngle={0}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={900}
              animationEasing="ease-in-out"
              activeIndex={activeIndex ?? -1}
              activeShape={renderActiveShape}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </CustomPie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
