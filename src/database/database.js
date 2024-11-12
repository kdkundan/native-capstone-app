import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("little_lemon");

// Create table function
export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS menu_items (
              id INTEGER PRIMARY KEY NOT NULL,
              name TEXT NOT NULL,
              description TEXT,
              price DECIMAL(10,2) NOT NULL,
              category TEXT NOT NULL,
              image TEXT
            );`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

// Save menu items function
export function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // First delete existing items
        tx.executeSql("DELETE FROM menu_items");

        // Then insert new items
        const query = `INSERT INTO menu_items (id, name, description, price, category, image) 
            VALUES ${menuItems.map(() => "(?, ?, ?, ?, ?, ?)").join(", ")}`;

        const values = menuItems.flatMap((item) => [
          item.id,
          item.name,
          item.description,
          item.price,
          item.category,
          item.image || null,
        ]);

        tx.executeSql(
          query,
          values,
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      },
      (error) => reject(error),
      () => resolve()
    );
  });
}

// Get menu items function
export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menu_items", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function filterMenuItems({
  query = "",
  categories = [],
  sortBy = "name",
  order = "ASC",
  limit = 100,
} = {}) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        let sql = "SELECT * FROM menu_items WHERE 1=1";
        let params = [];

        // Add search query filter
        if (query.trim()) {
          sql += " AND (name LIKE ? )";
          params.push(`%${query}%`);
        }

        // Add categories filter
        if (categories.length > 0) {
          sql += ` AND category IN (${new Array(categories.length)
            .fill("?")
            .join(",")})`;
          params = [...params, ...categories];
        }

        // Add sorting
        sql += ` ORDER BY ${sortBy} ${order}`;

        // Add limit
        sql += " LIMIT ?";
        params.push(limit);

        tx.executeSql(
          sql,
          params,
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      },
      (error) => reject(error)
    );
  });
}

export function destroyDatabase() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // Drop the entire table
        tx.executeSql(
          "DROP TABLE IF EXISTS menu_items;",
          [],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      },
      (error) => reject(error),
      () => resolve()
    );
  });
}
