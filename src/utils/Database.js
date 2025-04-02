import * as SQLite from 'expo-sqlite';

let db;
try {
  db = SQLite.openDatabase('bookmarks.db');
} catch (error) {
  console.error("❌ Failed to open SQLite database:", error);
  db = null;
}

export const createBookmarksTable = () => {
  if (!db) return;
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY,
        title TEXT,
        location TEXT,
        salary TEXT,
        phone TEXT
      );`
    );
  });
};

export const insertBookmark = (job, success, error) => {
  if (!db) return;
  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO bookmarks (id, title, location, salary, phone) VALUES (?, ?, ?, ?, ?)`,
      [job.id, job.title, job.location, job.salary, job.phone],
      success,
      error
    );
  });
};

export const getBookmarks = (success, error) => {
  if (!db) return;
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM bookmarks;`,
      [],
      (_, result) => success(result.rows._array),
      error
    );
  });
};

export const deleteBookmark = (id, success, error) => {
  if (!db) return;
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM bookmarks WHERE id = ?`, [id], success, error);
  });
};
