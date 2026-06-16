export const money = (
  amount
) =>
  `Rs. ${Number(
    amount || 0
  ).toLocaleString("en-IN")}`;

export const sectionTitle = (
  doc,
  title
) => {
  doc.moveDown();

  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .fillColor("#111827")
    .text(title);

  doc.moveDown(0.3);

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#d1d5db")
    .stroke();

  doc.moveDown();
};

export const summaryRow = (
  doc,
  label,
  value
) => {
  const y = doc.y;

  doc
    .fontSize(12)
    .font("Helvetica")
    .fillColor("#374151")
    .text(label, 50, y);

  doc
    .font("Helvetica-Bold")
    .fillColor("#111827")
    .text(
      String(value),
      400,
      y,
      {
        width: 120,
        align: "right",
      }
    );

  doc.moveDown();
};

export const getHealthColor = (
  score
) => {
  if (score >= 80) {
    return "#16a34a";
  }

  if (score >= 65) {
    return "#2563eb";
  }

  if (score >= 40) {
    return "#f59e0b";
  }

  return "#dc2626";
};

export const drawTableHeader = (
  doc,
  headers,
  positions
) => {
  const y = doc.y;

  doc
    .rect(
      50,
      y - 2,
      500,
      20
    )
    .fill("#e5e7eb");

  doc.fillColor("#111827");

  headers.forEach(
    (
      header,
      index
    ) => {
      doc
        .fontSize(10)
        .font(
          "Helvetica-Bold"
        )
        .text(
          header,
          positions[
            index
          ],
          y + 3
        );
    }
  );

  doc.moveDown(2);
};

export const drawLine = (
  doc
) => {
  doc
    .moveTo(
      50,
      doc.y
    )
    .lineTo(
      550,
      doc.y
    )
    .strokeColor(
      "#e5e7eb"
    )
    .stroke();

  doc.moveDown(0.5);
};