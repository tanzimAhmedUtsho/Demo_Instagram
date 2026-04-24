// ১. ২০টি পোস্টের জন্য ডামি ডেটা তৈরি করার ফাংশন
const generatePosts = (count) => {
  const posts = [];
  const locations = [
    "Jhenaidah, Bangladesh",
    "Dhaka",
    "Sylhet",
    "Chattogram",
    "Maldives",
    "Finland",
  ];

  for (let i = 1; i <= count; i++) {
    posts.push({
      username: i === 1 ? "coder_tanzim" : `user_explorer_${i}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      postImg: `https://picsum.photos/600/600?random=${i}`,
      likes: Math.floor(Math.random() * 500) + 50,
      caption: `Post number ${i}: Building this awesome Instagram clone! 🚀 #coding #webdev`,
    });
  }
  return posts;
};

// ২০টি পোস্টের লিস্ট তৈরি
const postData = generatePosts(20);

// ২. স্টোরি রেন্ডার করা (৮টি স্টোরি)
const renderStories = () => {
  const storyContainer = document.getElementById("story-container");
  const storyCount = 8;
  storyContainer.innerHTML = ""; // Clear container

  for (let i = 0; i < storyCount; i++) {
    const storyHTML = `
          <div class="flex-shrink-0 cursor-pointer">
              <div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                  <div class="w-full h-full rounded-full bg-white p-0.5">
                      <img src="https://i.pravatar.cc/150?u=${i}" class="w-full h-full rounded-full bg-gray-200 object-cover" alt="story">
                  </div>
              </div>
              <p class="text-[10px] text-center mt-1 font-medium">User_${i + 1}</p>
          </div>`;
    storyContainer.innerHTML += storyHTML;
  }
};

// ৩. ফিড রেন্ডার করার ফাংশন
const renderAllPosts = (data) => {
  const feedContainer = document.getElementById("feed-container");
  feedContainer.innerHTML = ""; // আগের পোস্টগুলো মুছে ফেলা

  if (data.length === 0) {
    feedContainer.innerHTML = `<p class="text-center text-gray-500 mt-10">No users found!</p>`;
    return;
  }

  data.forEach((post) => {
    const postHTML = `
          <div class="bg-white border rounded-lg mb-8 shadow-sm">
              <div class="flex items-center justify-between p-3">
                  <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 rounded-full overflow-hidden border">
                          <img src="https://i.pravatar.cc/150?u=${post.username}" class="w-full h-full object-cover">
                      </div>
                      <div>
                          <p class="font-semibold text-xs">${post.username}</p>
                          <p class="text-[10px] text-gray-500">${post.location}</p>
                      </div>
                  </div>
                  <i data-lucide="more-horizontal" size="20" class="cursor-pointer"></i>
              </div>
  
              <img src="${post.postImg}" class="post-image border-y w-full object-cover aspect-square bg-gray-100" alt="Post">
  
              <div class="p-3">
                  <div class="flex justify-between items-center mb-2">
                      <div class="flex space-x-4">
                          <i data-lucide="heart" class="cursor-pointer hover:text-red-500 transition-colors" onclick="handleLike(this)"></i>
                          <i data-lucide="message-circle" class="cursor-pointer"></i>
                          <i data-lucide="send" class="cursor-pointer"></i>
                      </div>
                      <i data-lucide="bookmark" class="cursor-pointer"></i>
                  </div>
                  <p class="font-semibold text-sm">${post.likes.toLocaleString()} likes</p>
                  <p class="text-sm mt-1">
                      <span class="font-semibold">${post.username}</span> ${post.caption}
                  </p>
                  <p class="text-gray-400 text-[11px] mt-2 cursor-pointer uppercase font-medium">View all comments</p>
              </div>
          </div>
      `;
    feedContainer.innerHTML += postHTML;
  });

  // আইকনগুলো নতুন করে লোড করা (সার্চের পর দরকার হয়)
  lucide.createIcons();
};

// ৪. সার্চ ফাংশনালিটি (HTML এর onkeyup থেকে কল হবে)
function filterPosts() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  const filteredData = postData.filter((post) =>
    post.username.toLowerCase().includes(searchTerm),
  );

  renderAllPosts(filteredData);
}

// ৫. লাইক ফাংশনালিটি
function handleLike(element) {
  element.classList.toggle("fill-current");
  element.classList.toggle("text-red-500");
}

// প্রাথমিক রেন্ডারিং
renderStories();
renderAllPosts(postData);
