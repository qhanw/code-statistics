"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

type ChartProps = { data: any };

export function LineChart({ data }: ChartProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: Chart;
    if (ref.current) {
      const dataSet = data.reduce(
        (prev: any, curr: any) => {
          if (curr.sum === "total_commit") return prev;
          prev.labels.push(curr.name);
          prev.added.push(curr.added);
          prev.removed.push(curr.removed);
          prev.total.push(curr.total);

          return prev;
        },
        { labels: [], added: [], removed: [], total: [] }
      );

      chart = new Chart(ref.current, {
        type: "bar",
        data: {
          labels: dataSet.labels,
          datasets: [
            {
              label: "新增",
              data: dataSet.added,
              backgroundColor: "rgb(75, 192, 192, .5)",
              borderColor: "rgb(75, 192, 192)",
            },
            {
              label: "删除",
              data: dataSet.removed,
              backgroundColor: "rgb(255, 99, 132, .5)",
              borderColor: "rgb(255, 99, 132)",
            },
            {
              label: "共计",
              data: dataSet.total,
              backgroundColor: "rgb(54, 162, 235, .5)",
              borderColor: "rgb(54, 162, 235)",
            },
          ],
        },
      });
    }

    return () => {
      chart?.destroy();
    };
  }, []);
  return <canvas ref={ref} />;
}
