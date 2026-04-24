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
  storyContainer.innerHTML = "";

  for (let i = 0; i < storyCount; i++) {
    const storyHTML = `
          <div class="flex-shrink-0 cursor-pointer group">
              <div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 group-hover:scale-105 transition-transform">
                  <div class="w-full h-full rounded-full bg-white p-0.5">
                      <img src="https://i.pravatar.cc/150?u=user${i}" class="w-full h-full rounded-full bg-gray-200 object-cover" alt="story">
                  </div>
              </div>
              <p class="text-[10px] text-center mt-1 font-medium text-gray-600">User_${i + 1}</p>
          </div>`;
    storyContainer.innerHTML += storyHTML;
  }
};

// ৩. ফিড রেন্ডার করার ফাংশন
const renderAllPosts = (data) => {
  const feedContainer = document.getElementById("feed-container");
  feedContainer.innerHTML = "";

  if (data.length === 0) {
    feedContainer.innerHTML = `<div class="text-center py-20 text-gray-500">No users found!</div>`;
    return;
  }

  data.forEach((post) => {
    const postHTML = `
          <div class="bg-white border rounded-xl mb-8 shadow-sm overflow-hidden">
              <div class="flex items-center justify-between p-3">
                  <div class="flex items-center space-x-3 cursor-pointer group" onclick="openProfile('${post.username}', '${post.location}')">
                      <div class="w-9 h-9 rounded-full overflow-hidden border">
                          <img src="https://i.pravatar.cc/150?u=${post.username}" class="w-full h-full object-cover">
                      </div>
                      <div>
                          <p class="font-bold text-xs group-hover:underline">${post.username}</p>
                          <p class="text-[10px] text-gray-500">${post.location}</p>
                      </div>
                  </div>
                  <i data-lucide="more-horizontal" size="20" class="cursor-pointer text-gray-400"></i>
              </div>
  
              <img src="${post.postImg}" class="post-image border-y w-full object-cover aspect-square bg-gray-100 cursor-pointer" alt="Post" ondblclick="handleDoubleTapLike(this)">
  
              <div class="p-3">
                  <div class="flex justify-between items-center mb-2">
                      <div class="flex space-x-4">
                          <i data-lucide="heart" class="cursor-pointer hover:text-red-500 transition-all active:scale-125" onclick="handleLike(this)"></i>
                          <i data-lucide="message-circle" class="cursor-pointer"></i>
                          <i data-lucide="send" class="cursor-pointer"></i>
                      </div>
                      <i data-lucide="bookmark" class="cursor-pointer"></i>
                  </div>
                  <p class="font-bold text-sm text-gray-800">${post.likes.toLocaleString()} likes</p>
                  <p class="text-sm mt-1">
                      <span class="font-bold cursor-pointer hover:underline" onclick="openProfile('${post.username}', '${post.location}')">${post.username}</span> ${post.caption}
                  </p>
                  <p class="text-gray-400 text-[11px] mt-2 cursor-pointer uppercase font-medium">View all comments</p>
              </div>
          </div>
      `;
    feedContainer.innerHTML += postHTML;
  });

  lucide.createIcons();
};

// ৪. প্রোফাইল মোডাল ফাংশনালিটি
function openProfile(username, location) {
  const modal = document.getElementById("profile-modal");
  document.getElementById("modal-username").innerText = username;
  document.getElementById("modal-loc-text").innerText = location;
  document.getElementById("modal-user-img").src =
    `https://i.pravatar.cc/150?u=${username}`;

  modal.classList.remove("hidden");
  // আইকন রি-রেন্ডার করা কারণ মোডাল আগে hidden ছিল
  lucide.createIcons();
}

function closeProfile() {
  document.getElementById("profile-modal").classList.add("hidden");
}

// ৫. সার্চ ফাংশনালিটি
function filterPosts() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredData = postData.filter((post) =>
    post.username.toLowerCase().includes(searchTerm),
  );
  renderAllPosts(filteredData);
}

// ৬. লাইক ফাংশনালিটি
function handleLike(element) {
  element.classList.toggle("fill-current");
  element.classList.toggle("text-red-500");
}

// এসকেপ কি চাপলে মোডাল বন্ধ হবে
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProfile();
});

// শুরুর রেন্ডারিং
renderStories();
renderAllPosts(postData);
