"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, ClipboardCheck } from "lucide-react";
import PipelineChart from "@/components/PipelineChart";

const statCards = [
    { value: "1,000+", label: "Candidates Seeded", color: "#003F5C" },
    { value: "25", label: "Jobs Managed", color: "#58508D" },
    { value: "6-Stage", label: "Hiring Pipeline", color: "#BC5090" },
];


const coreFeatures = [
    { icon: Briefcase, title: "Manage Jobs", desc: "Create, edit, archive, and reorder job postings with an intuitive drag-and-drop interface.", color: "#003F5C" },
    { icon: Users, title: "Track Candidates", desc: "Visualize your hiring pipeline with a Kanban board and view detailed candidate profiles.", color: "#58508D" },
    { icon: ClipboardCheck, title: "Build Assessments", desc: "Design custom, job-specific assessments with a live preview builder and validation rules.", color: "#BC5090" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">TalentFlow</span>
        </h2>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          This is your central hub for managing the entire hiring pipeline.
        </p>
      </motion.div>

      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card p-6 rounded-lg border"
            >
              <p
                className="text-4xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="pt-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <PipelineChart />
          </motion.div>

          <div className="lg:col-span-3">
             <h3 className="text-2xl font-bold tracking-tight mb-6">Core Features</h3>
             <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
             {coreFeatures.map((feature, i) => (
                <motion.div
                    key={feature.title}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-card p-6 rounded-lg flex items-start space-x-4"
                >
                    <div
                        className="text-primary-foreground h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                    >
                        <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

