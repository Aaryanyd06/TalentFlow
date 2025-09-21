"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, ClipboardCheck } from "lucide-react";

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

      {/* Analytics Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { value: "1,000+", label: "Candidates Seeded" },
            { value: "25", label: "Jobs Managed" },
            { value: "6-Stage", label: "Hiring Pipeline" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card p-6 rounded-lg border"
            >
              <p className="text-4xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-4 pb-12">
         <h3 className="text-2xl font-bold tracking-tight mb-6">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Briefcase, title: "Manage Jobs", desc: "Create, edit, archive, and reorder job postings with an intuitive drag-and-drop interface." },
            { icon: Users, title: "Track Candidates", desc: "Visualize your hiring pipeline with a Kanban board and view detailed candidate profiles." },
            { icon: ClipboardCheck, title: "Build Assessments", desc: "Design custom, job-specific assessments with a live preview builder and validation rules." },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card p-6 rounded-lg border"
            >
              <div className="bg-primary text-primary-foreground h-12 w-12 rounded-lg flex items-center justify-center">
                <feature.icon className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}