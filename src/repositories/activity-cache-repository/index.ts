import { redis } from "@/config";

async function getAllActivities() {
  return redis.get("allActivities");
}

async function insertAllActivities(activities: any[]) {
  return redis.set("allActivities", JSON.stringify(activities));
}

async function getActivitiesByDate(date: string) {
  return redis.get(date);
}

async function insertActivitiesByDate(date: string, activities: any[]) {
  return redis.set(date, JSON.stringify(activities));
}

const activityCacheRepository = {
  getAllActivities,
  insertAllActivities,
  getActivitiesByDate,
  insertActivitiesByDate,
};

export default activityCacheRepository;
