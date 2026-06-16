import Alert from "../models/Alert.js";
import { generateAlerts } from "../utils/generateAlerts.js";

export const getAlerts = async (
  req,
  res,
  next
) => {
  try {
    await generateAlerts(
      req.user._id
    );

    const alerts =
      await Alert.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      alerts,
    });
  } catch (error) {
    console.error(
      "ALERT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
export const markAlertRead = async (
  req,
  res,
  next
) => {
  try {
    const alert =
      await Alert.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!alert) {
      res.status(404);
      throw new Error(
        "Alert not found"
      );
    }

    alert.isRead = true;

    await alert.save();

    res.status(200).json({
      success: true,
      message:
        "Alert marked as read",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAlert = async (
  req,
  res,
  next
) => {
  try {
    const alert =
      await Alert.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!alert) {
      res.status(404);
      throw new Error(
        "Alert not found"
      );
    }

    await alert.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Alert deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};