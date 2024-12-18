import Cost from "../model/cost.Model.js";
import PDFGenerator from "../utils/pdf.js";
import sendMail from "../utils/email.js";

export const calculateCost = async (req, res) => {
  try {
    const {
      name,
      email,
      type,
      pages,
      domain,
      hosting,
      officialEmail,
      specialRequirements,
      features,
    } = req.body;

    // Define feature options and prices for each project type
    const featureCosts = {
      "Website-Design": {
        "corporate": 500,
        "static": 300,
        "informative": 200,
        "e-commerce": 1000,
        "landing page": 400,
        "dynamic": 700,
        "responsive": 600,
        "creative": 800,
        "custom": 1200,
      },
      "Website-Development": {
        "B2B": 1500,
        "B2C": 1200,
        "classified site": 1000,
        "online exam system": 1300,
        "portal": 800,
        "cms": 700,
      },
      "Application-Development": {
        "android": 1500,
        "ios": 1500,
        "game": 2000,
        "cloud": 1800,
        "e-commerce": 1200,
        "cryptocurrency": 2500,
        "blockchain": 2500,
        "hotel app": 1300,
        "school app": 1000,
      },
      "Software-Development": {
        "financial management": 2500,
        "workforce management": 2200,
        "hr": 1800,
        "e-learning": 1500,
        "fleet management": 2000,
        "crm": 2500,
        "operation management": 2200,
        "web portal": 1700,
        "cms": 1200,
        "enterprise resource": 2500,
        "document management": 1500,
        "ar&vr development": 3000,
      }
    };

    // Validate type against allowed values
    if (
      ![
        "Website-Design",
        "Website-Development",
        "Application-Development",
        "Software-Development",
      ].includes(type)
    ) {
      return res.status(400).json({ error: "Invalid project type" });
    }

    // Validate features for the chosen project type
    const validFeatures = featureCosts[type];
    const invalidFeatures = features.filter(feature => !validFeatures[feature]);

    if (invalidFeatures.length > 0) {
      return res.status(400).json({
        error: `Invalid features for ${type}: ${invalidFeatures.join(", ")}`,
      });
    }

    // Base costs for project types
    const projectBaseCosts = {
      "Website-Design": 500,
      "Website-Development": 1000,
      "Application-Development": 2000,
      "Software-Development": 3000,
    };

    // Additional costs
    const hostingCost = hosting.length * 200; // $200 per hosting option
    const domainCost = domain.length * 100; // $100 per domain
    const officialEmailCost = officialEmail ? 50 : 0; // $50 if official email is used
    const specialRequirementsCost = specialRequirements.length * 50; // $50 per special requirement
    const pageCost = pages * 100; // $100 per page

    // Calculate total feature cost
    const featureCost = features.reduce((total, feature) => total + validFeatures[feature], 0);

    // Calculate total cost
    const totalCost =
      projectBaseCosts[type] +
      pageCost +
      hostingCost +
      domainCost +
      officialEmailCost +
      specialRequirementsCost +
      featureCost;

    // Estimate time: 1 day per page + 1 day per special requirement + 0.5 days per feature
    const estimatedTime = pages + specialRequirements.length + features.length * 0.5;

    // Save to database
    const newCost = new Cost({
      name,
      email,
      type,
      pages,
      domain,
      hosting,
      officialEmail,
      specialRequirements,
      features,
      totalCost,
      estimatedTime,
    });

    await newCost.save();

    // Generate and send PDF
    const pdfPath = await PDFGenerator(
      name,
      type,
      pages,
      domain,
      hosting,
      officialEmail,
      specialRequirements,
      features,
      totalCost,
      estimatedTime
    );
    await sendMail(email, pdfPath);

    res.status(200).json({
      message: "Cost calculated and email sent!",
      totalCost,
      estimatedTime,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
