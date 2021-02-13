const badge = (urban, nature, sea, others) => {
  if (urban === nature && nature === sea && sea === others && others === 0) {
    return "New Adventurer";
  } else if (urban >= 10 && nature >= 10 && sea >= 10 && others >= 10) {
    return "Pro Traveller";
  } else if (urban === Math.max(urban, nature, sea, others)) {
    return "Urban Traveller";
  } else if (nature === Math.max(urban, nature, sea, others)) {
    return "Nature Traveller";
  } else if (sea === Math.max(urban, nature, sea, others)) {
    return "Sea Traveller";
  } else {
    return "Going Places";
  }
};

export default badge;
