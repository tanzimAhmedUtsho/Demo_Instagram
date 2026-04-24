// ১. কিছু ডামি ডেটা তৈরি করা
const postData = [
  {
    username: "coder_tanzim",
    location: "Jhenaidah, Bangladesh",
    postImg: "https://picsum.photos/600/600?random=1",
    likes: 245,
    caption: "Building something cool with Vanilla JS! 💻✨",
  },
  {
    username: "nature_lover",
    location: "Sylhet",
    postImg: "https://picsum.photos/600/600?random=2",
    likes: 120,
    caption: "Rainy days are just peaceful.",
  },
];

const storyCount = 8;

// ২. স্টোরি রেন্ডার করা
const storyContainer = document.getElementById("story-container");

for (let i = 0; i < storyCount; i++) {
  const storyHTML = `
        <div class="flex-shrink-0 cursor-pointer">
            <div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                <div class="w-full h-full rounded-full bg-white p-0.5">
                    <div class="w-full h-full rounded-full bg-gray-200"></div>
                </div>
            </div>
            <p class="text-[10px] text-center mt-1">User_${i + 1}</p>
        </div>`;
  storyContainer.innerHTML += storyHTML;
}

// ৩. ফিড রেন্ডার করা
const feedContainer = document.getElementById("feed-container");

postData.forEach((post) => {
  const postHTML = `
        <div class="bg-white border rounded-lg mb-8 shadow-sm">
            <div class="flex items-center justify-between p-3">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div>
                        <p class="font-semibold text-xs">${post.username}</p>
                        <p class="text-[10px] text-gray-500">${post.location}</p>
                    </div>
                </div>
                <i data-lucide="more-horizontal" size="20" class="cursor-pointer"></i>
            </div>

            <img src="${post.postImg}" class="post-image border-y" alt="Post">

            <div class="p-3">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex space-x-4">
                        <i data-lucide="heart" class="cursor-pointer hover:text-red-500 transition-colors" onclick="handleLike(this)"></i>
                        <i data-lucide="message-circle" class="cursor-pointer"></i>
                        <i data-lucide="send" class="cursor-pointer"></i>
                    </div>
                    <i data-lucide="bookmark" class="cursor-pointer"></i>
                </div>
                <p class="font-semibold text-sm">${post.likes} likes</p>
                <p class="text-sm mt-1">
                    <span class="font-semibold">${post.username}</span> ${post.caption}
                </p>
                <p class="text-gray-400 text-[11px] mt-2 cursor-pointer uppercase">View all comments</p>
            </div>
        </div>
    `;
  feedContainer.innerHTML += postHTML;
});

// ৪. আইকনগুলো একটিভ করা
lucide.createIcons();

// ৫. লাইক ফাংশনালিটি
function handleLike(element) {
  element.classList.toggle("fill-current");
  element.classList.toggle("text-red-500");
}
